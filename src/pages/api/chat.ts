import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../../utils/env";
 

export const prerender = false;
export const POST = async ({ request }: { request: Request }) => {
  const body = await request.json();
  const { message } = body;
  const genai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
  });  
  const response = await genai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: message,
    config: {
      temperature: 0.5,
    }
  })
  const messageResponse =  response.text
  
  if (!messageResponse) {
    return new Response("No response", {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
      statusText: "Internal Server Error",
    });
  }
  return new Response(messageResponse, {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
    statusText: "OK",
  });
}