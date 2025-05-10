async function generateScript() {
  const emotion = document.getElementById("emotion").value;

  console.log("Emotion selected: ", emotion);

  if (!emotion) {
    alert("Please select an emotion.");
    return;
  }

  const prompt = `Generate a short Instagram reel script in Hindi and English, with an emotional tone based on "${emotion}". Also include a matching image prompt for AI image generation and background music suggestion (song or instrumental).`;

  console.log("Sending request to API with prompt: ", prompt);

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    console.log("API Response: ", data);

    const output = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!output) {
      throw new Error("Empty or invalid response");
    }

    const [script, imagePrompt, music] = output
      .split(/Image Prompt:|Music Suggestion:/)
      .map((x) => x.trim());

    console.log("Script: ", script);
    console.log("Image Prompt: ", imagePrompt);
    console.log("Music Suggestion: ", music);

    document.getElementById("script").innerText = script.replace("Script:", "").trim();
    document.getElementById("imagePrompt").innerText = imagePrompt || "-";
    document.getElementById("musicSuggestion").innerText = music || "-";
  } catch (err) {
    console.error("Error while processing response: ", err);
    document.getElementById("script").innerText = "Something went wrong or incomplete response.";
    document.getElementById("imagePrompt").innerText = "-";
    document.getElementById("musicSuggestion").innerText = "-";
  }
}
