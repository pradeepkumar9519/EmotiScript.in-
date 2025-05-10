const API_KEY = "AIzaSyDmAl6Sm52GENTGcKAQv9kw2MtgzzyA60k";

async function generateScript() {
  const emotion = document.getElementById("emotion").value;
  
  console.log("Emotion selected: ", emotion);  // Check what emotion is selected
  
  if (!emotion) {
    alert("Please select an emotion.");
    return;
  }

  const prompt = `Generate a short Instagram reel script in Hindi and English, with an emotional tone based on "${emotion}". Also include a matching image prompt for AI image generation and background music suggestion (song or instrumental).`;
  
  console.log("Sending request to API with prompt: ", prompt);  // Check the prompt being sent

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await response.json();
  
  console.log("API Response: ", data);  // Log the API response for debugging

  try {
    const output = data.candidates[0].content.parts[0].text;
    const [script, imagePrompt, music] = output.split(/Image Prompt:|Music Suggestion:/).map(x => x.trim());

    console.log("Script: ", script);  // Log the generated script
    console.log("Image Prompt: ", imagePrompt);  // Log the image prompt
    console.log("Music Suggestion: ", music);  // Log the music suggestion

    document.getElementById("script").innerText = script.replace("Script:", "").trim();
    document.getElementById("imagePrompt").innerText = imagePrompt;
    document.getElementById("musicSuggestion").innerText = music;
  } catch (err) {
    console.error("Error while processing response: ", err);
    document.getElementById("script").innerText = "Something went wrong or incomplete response.";
    document.getElementById("imagePrompt").innerText = "-";
    document.getElementById("musicSuggestion").innerText = "-";
  }
}
