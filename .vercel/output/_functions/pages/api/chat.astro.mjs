import { GoogleGenAI } from '@google/genai';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  const body = await request.json();
  const { message } = body;
  const genai = new GoogleGenAI({
    apiKey: "AIzaSyCqjFQlOp6RJrrZYZCHUo983cevWp0FAwU"
  });
  const response = await genai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: message,
    config: {
      temperature: 0.5
    }
  });
  const messageResponse = response.text;
  if (!messageResponse) {
    return new Response("No response", {
      headers: {
        "Content-Type": "application/json"
      },
      status: 500,
      statusText: "Internal Server Error"
    });
  }
  return new Response(messageResponse, {
    headers: {
      "Content-Type": "application/json"
    },
    status: 200,
    statusText: "OK"
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
