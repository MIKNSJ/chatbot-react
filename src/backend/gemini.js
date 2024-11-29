import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/*const prompt = "Explain how AI works";

const result = await model.generateContent(prompt);
console.log(result.response.text());*/