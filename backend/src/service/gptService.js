import OpenAI from "openai";
import Course from "../models/courseModel.js";
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateCourseRecommendations = async (prompt) => {

  const courses = await Course.find();
  const courseTitles = courses.map((course) => course.title).join(", ");

  const gptPrompt = `Based on: "${prompt}", recommend relevant courses from: ${courseTitles}. Provide a short explanation for each.`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: gptPrompt }],
    max_tokens: 200,
  });

  return response.choices[0].message.content;
};
