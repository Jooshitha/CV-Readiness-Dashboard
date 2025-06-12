import React, { useState } from 'react';
import './index.css';
import InputForm from './components/InputForm';
import SkillGaps from './components/SkillGaps';
import MiniAssignments from './components/MiniAssignments';

export default function App() {
  const [cvText, setCvText] = useState('');
  const [jdText, setJdText] = useState('');
  const [result, setResult] = useState(null);
  const [gaps, setGaps] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callGeminiAPI = async (prompt) => {
    const apiKey = 'AIzaSyCLLlS4TTSsDnkMY3hV40PjN51u7SXMOyQ';
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const payload = { contents: [{ role: 'user', parts: [{ text: prompt }] }] };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log("Raw API Response:", JSON.stringify(data, null, 2));
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Invalid response';
    } catch (err) {
      console.error(err);
      return `Error calling API: ${err.message}`;
    }
  };

  const downloadOptimizedCV = () => {
    if (!result) {
      alert("No result available.");
      return;
    }

    const startMarker = "Optimized CV Text:";
    const endMarker = "Optimized CV Match Score:";

    const startIndex = result.indexOf(startMarker);
    const endIndex = result.indexOf(endMarker);

    if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
      alert("Optimized CV not found in the response.");
      return;
    }

    const optimizedCV = result
      .substring(startIndex + startMarker.length, endIndex)
      .trim();

    if (!optimizedCV) {
      alert("Optimized CV not found in the response.");
      return;
    }

    const blob = new Blob([optimizedCV], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Optimized_CV.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleMatchAndScore = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setGaps(null);

    const scorePrompt = `Analyze the following Candidate CV and Job Description.\nCV: ${cvText}\nJob Description: ${jdText}\n\nProvide a score for how well the CV matches the JD out of 100.\nThen, provide an optimized version of the CV that is better tuned to the Job Description.\nFinally, give a new score for the optimized CV out of 100.\n\nFormat your response clearly with these exact sections:\nOriginal CV Match Score: [Score]%\nOptimized CV Text: [Optimized CV Content]\nOptimized CV Match Score: [Score]%`;

    const gapPrompt = `Based on the following Candidate CV and Job Description, identify 3-5 key skill gaps.\nCV: ${cvText}\nJob Description: ${jdText}\n\nFor each skill gap, suggest a very brief mini-assignment or learning snippet (1-2 sentences) to help close that gap.\n\nFormat your response clearly with these exact sections:\nSkill Gaps:\n- [Skill 1]: [Mini-assignment/Learning snippet]\n- [Skill 2]: [Mini-assignment/Learning snippet]`;

    const scoreResponse = await callGeminiAPI(scorePrompt);
    const gapResponse = await callGeminiAPI(gapPrompt);

    setResult(scoreResponse);
    setGaps(gapResponse);
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 text-gray-800 font-sans">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-blue-700">
        SKANJO Candidate Readiness Dashboard
      </h1>

      <InputForm
        cvText={cvText}
        setCvText={setCvText}
        jdText={jdText}
        setJdText={setJdText}
        handleMatchAndScore={handleMatchAndScore}
        loading={loading}
      />

      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

      {result && (
        <div className="mt-10 bg-white shadow-lg rounded-lg p-6 transition duration-300 ease-in-out">
          <h2 className="text-xl font-semibold mb-3 text-blue-700">CV Match Analysis</h2>
          <pre className="whitespace-pre-wrap text-gray-700 bg-gray-50 p-4 rounded-md border border-gray-200 overflow-x-auto text-sm">
            {result}
          </pre>
        </div>
      )}

      {result && (
        <div className="text-center mt-4">
          <button
            onClick={downloadOptimizedCV}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow"
          >
            Download Optimized CV
          </button>
        </div>
      )}

      {gaps && (
        <div className="mt-10">
          <MiniAssignments gaps={gaps} />
        </div>
      )}
    </div>
  );
}
