async function generateScript() {
  const emotion = document.getElementById("emotion").value;

  if (!emotion) {
    alert("Please select an emotion.");
    return;
  }

  const prompt = `Generate a short Instagram reel script in Hindi and English, with an emotional tone based on "${emotion}". Also include a matching image prompt for AI image generation and background music suggestion (song or instrumental).`;

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    const output = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!output) throw new Error("No output received");

    const [script, imagePrompt, music] = output
      .split(/Image Prompt:|Music Suggestion:/)
      .map((x) => x.trim());

    document.getElementById("script").innerText = script.replace("Script:", "").trim();
    document.getElementById("imagePrompt").innerText = imagePrompt || "-";
    document.getElementById("musicSuggestion").innerText = music || "-";
  } catch (err) {
    document.getElementById("script").innerText = "Something went wrong or incomplete response.";
    document.getElementById("imagePrompt").innerText = "-";
    document.getElementById("musicSuggestion").innerText = "-";
    console.error("Error:", err);
  }
}
