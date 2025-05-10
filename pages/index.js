import { useState } from 'react';

export default function Home() {
  const [emotion, setEmotion] = useState('');
  const [script, setScript] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [musicSuggestion, setMusicSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setScript('');
    setImagePrompt('');
    setMusicSuggestion('');

    const prompt = `Emotion: ${emotion}\n\nGenerate an emotional Instagram reel script in Hindi + English, a short image prompt and a music suggestion.`;

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Something went wrong or incomplete response.';
      
      const [scriptPart, imagePart, musicPart] = text.split('Image Prompt:');
      const [mainScript, rest] = scriptPart.split('Script:');
      const [img, music] = rest?.split('Music Suggestion:') || [];

      setScript((mainScript || '').trim() + "\n" + (img || '').trim());
      setImagePrompt((img || '').trim());
      setMusicSuggestion((music || '').trim());
    } catch (error) {
      setScript('Something went wrong.');
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto', fontFamily: 'Arial' }}>
      <h2>EmotiScript.in - Emotion to Reel Script Generator</h2>
      <select value={emotion} onChange={(e) => setEmotion(e.target.value)}>
        <option value="">Select Emotion</option>
        <option value="Love">Love</option>
        <option value="Sadness">Sadness</option>
        <option value="Hope">Hope</option>
        <option value="Struggle">Struggle</option>
        <option value="Mother">Mother</option>
      </select>
      <button onClick={handleGenerate} style={{ marginLeft: 10 }}>
        {loading ? 'Generating...' : 'Generate'}
      </button>

      <div style={{ marginTop: 20 }}>
        <h4>Script:</h4>
        <pre>{script}</pre>
        <h4>Image Prompt:</h4>
        <pre>{imagePrompt}</pre>
        <h4>Music Suggestion:</h4>
        <pre>{musicSuggestion}</pre>
      </div>
    </div>
  );
}
