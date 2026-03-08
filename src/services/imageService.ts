import { GoogleGenAI, Type } from "@google/genai";

export async function analyzeImage(imageData: string, mimeType: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        {
          text: "Categorize this product (e.g., Shoes, Electronics, Furniture), assess quality (1-5), and check for duplicates. Return JSON.",
        },
        {
          inlineData: {
            data: imageData,
            mimeType: mimeType,
          },
        },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING },
          quality: { type: Type.NUMBER },
          isDuplicate: { type: Type.BOOLEAN },
        },
        required: ["category", "quality", "isDuplicate"],
      },
    },
  });

  const content = response.text || "{}";

  try {
    return JSON.parse(content);
  } catch (e) {
    console.error("Failed to parse JSON response from Gemini:", content);
    throw new Error("Invalid JSON response from Gemini API");
  }
}
