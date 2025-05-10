<!DOCTYPE html>
<html>
  <body>
    <h2>Test Gemini API</h2>
    <button onclick="testAPI()">Run Test</button>
    <pre id="output"></pre>

    <script>
      async function testAPI() {
        const prompt = "Generate a short emotional Instagram reel script in Hindi and English based on 'hope'. Also include image prompt and music suggestion.";

        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });

        const data = await res.json();
        document.getElementById("output").textContent = JSON.stringify(data, null, 2);
      }
    </script>
  </body>
</html>
