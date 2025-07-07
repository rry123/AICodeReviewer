const { GoogleGenAI } = require("@google/generative-ai");
require("dotenv").config();
const genAI = new GoogleGenAI(process.env.GOOGLE_GEMINI_KEY);


// const genAI = new GoogleGenerativeAI({
//     apiKey: process.env.GOOGLE_GEMINI_KEY,
//   });
// async function main() {
//   const response = await genAI.models.generateContent({
//     model: "gemini-2.5-flash",
//     prompt: "Explain how AI works in a few words",
//   });
//   console.log(response.text);
// }

// await main();


async function generateContent(prompt) {
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    console.log(response.text);
  }
  
await generateContent();

// async function generateContent(prompt){
//     const result = await genAI.models.generateContent(prompt);
//     return result.response.text();
// }

module.exports = generateContent
