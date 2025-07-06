import { generateCourseRecommendations } from "../service/gptService.js";

export const getCourseRecommendations = async (req, res) => {
  const { prompt } = req.body;

  try {
    const recommendations = await generateCourseRecommendations(prompt);
    res.json({ recommendations });
  } catch (err) {
    res.status(500).json({ 
      msg: "Error with OpenAI API",
      error: err.message
    });
  }
};