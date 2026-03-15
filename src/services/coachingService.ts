import { GoogleGenAI, Type } from "@google/genai";

export async function getCoachingInsights(retailData: any, imageMetrics: any) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'undefined') {
    throw new Error("GEMINI_API_KEY is missing. Please add it to your environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    You are a Smart Orchestration & Coaching Agent. 
    Analyze the following retail data and image metrics to provide proactive recommendations.
    
    Retail Data: ${JSON.stringify(retailData)}
    Image Metrics: ${JSON.stringify(imageMetrics)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            daily_actions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  severity: { type: Type.STRING }
                },
                required: ["title", "description", "severity"]
              }
            },
            anomalies: { type: Type.ARRAY, items: { type: Type.STRING } },
            tests_suggested: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["summary", "daily_actions", "anomalies", "tests_suggested"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from Gemini");
    }
    
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to generate coaching insights with Gemini:", e);
    throw new Error("Invalid response from Gemini API");
  }
}
