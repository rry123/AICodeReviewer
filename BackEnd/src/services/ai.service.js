// const { GoogleGenerativeAI } = require("@google/generative-ai");
// require("dotenv").config();
// console.log("Loaded Gemini API Key:", process.env.GOOGLE_GEMINI_KEY);
// const genAI = new GoogleGenerativeAI({
//   apiKey: process.env.GOOGLE_GEMINI_KEY,
// });

// const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// async function generateContent(prompt) {
//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   return response.text();
// }

// module.exports = generateContent;

// const { GoogleGenerativeAI } = require("@google/generative-ai");
// require('dotenv').config({ path: '.env' }); 

// // Debugging - remove after testing


// const genAI = new GoogleGenerativeAI({
//   apiKey: process.env.GOOGLE_GEMINI_KEY
// });

// console.log("Key exists?", !!process.env.GOOGLE_GEMINI_KEY);
// console.log("Key length:", process.env.GOOGLE_GEMINI_KEY?.length);

// // Use one of these models:
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// async function generateContent(prompt) {
//   try {
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     return response.text();
//   } catch (error) {
//     console.error("Full error details:", JSON.stringify(error, null, 2));
//     throw new Error(`AI Service Error: ${error.message}`);
//   }
// }

// module.exports = generateContent;

require("dotenv").config();
const MODEL = "gemini-2.5-flash";
const API_KEY = process.env.GOOGLE_GEMINI_KEY;

async function generateContent(code) {
  const fetch = (await import("node-fetch")).default;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

  const instruction = `You are an expert software engineer and code reviewer with deep knowledge of software design principles, programming languages, and best practices across modern development stacks.

Your task is to review the provided code thoroughly and give constructive, actionable feedback to the developer. Your response should be clear, helpful, and friendly — aimed at improving the code quality while helping the developer learn and grow.

Please follow these guidelines during your review:

1. **Correctness:** Identify any functional bugs, logical errors, or edge cases that the code may fail to handle.
2. **Code Quality:** Suggest improvements in readability, maintainability, and consistency (naming conventions, formatting, modularity, etc.).
3. **Efficiency:** Recommend ways to optimize the code for performance, memory usage, or time complexity when applicable.
4. **Best Practices:** Highlight adherence to or deviation from modern programming standards and clean code principles.
5. **Security & Robustness:** If applicable, point out security vulnerabilities or lack of validation/sanitization.
6. **Documentation & Comments:** Note missing or unclear comments, especially for complex logic.
7. **Positive Reinforcement:** Acknowledge what is done well before pointing out areas of improvement.

Format your feedback as a clear bullet-point list or structured paragraphs. Be specific — refer to line numbers or code segments when necessary. Avoid generic feedback.

Now, please review the following code:

\`\`\`
${code}
\`\`\`
`;


  const requestBody = {
    contents: [
      {
        role: "user",
        parts: [{ text: instruction }]
      }
    ]
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response:", errorData);
      throw new Error(errorData.error?.message || "Unknown error");
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("AI Service Error:", error.message);
    throw new Error("Failed to generate content from Gemini");
  }
}

module.exports = generateContent;
