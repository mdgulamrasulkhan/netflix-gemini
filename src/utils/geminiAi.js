import { GoogleGenAI } from "@google/genai";

console.log("************", process.env.REACT_APP_GEMINIAI_KEY);

export const genAI = new GoogleGenAI({
  apiKey: process.env.REACT_APP_GEMINIAI_KEY,
});
