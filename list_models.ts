import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
  try {
    const models = await groq.models.list();
    console.log("Available models:", models.data.map(m => m.id).filter(id => id.includes('vision') || id.includes('llama-3.2')));
  } catch (e) {
    console.error(e);
  }
}
main();
