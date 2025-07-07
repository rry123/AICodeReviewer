// const aiService = require("../services/ai.service")
// module.exports.getResponse = async (req, res) => {
//     const prompt = req.query.prompt;
//     if(!prompt){
//         return res.status(400).send("Prompt is required");
//     }
//     const response = aiService(prompt);
//     res.send(response);
// }

const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  const code = req.body.code;

  if (!code) {
    return res.status(400).send("Code is required");
  }

  try {
    const response = await aiService(code);
    res.status(200).send({ review: response }); // optionally wrap in object
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).send("Error generating AI response");
  }
};