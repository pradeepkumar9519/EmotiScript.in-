// app/api/generate/route.js

export async function POST(req) {
  const { prompt } = await req.json();

  const GEMINI_API_KEY = "AIzaSyBxo1EBv3S7hC2FkToEfPrINMn-27Vx3Ek"; // Aapka real API key

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      })
    }
  );

  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
}
