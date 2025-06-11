import React from 'react';

export default function MatchResults({ result }) {
  const originalScoreMatch = result.match(/Original CV Match Score: (\d+)%/);
  const optimizedScoreMatch = result.match(/Optimized CV Match Score: (\d+)%/);
  const optimizedCVMatch = result.match(/Optimized CV Text:\s*([\s\S]*?)\nOptimized CV Match Score:/);

  const originalScore = originalScoreMatch ? originalScoreMatch[1] : 'N/A';
  const optimizedScore = optimizedScoreMatch ? optimizedScoreMatch[1] : 'N/A';
  const optimizedCV = optimizedCVMatch ? optimizedCVMatch[1].trim() : 'N/A';

  const handleDownload = () => {
    const blob = new Blob([optimizedCV], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'optimized_cv.txt';
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white p-8 rounded-xl shadow-xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        CV Match Results
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
        <div className="p-6 border rounded-lg shadow-sm bg-blue-50">
          <h3 className="text-lg font-medium text-blue-600">Original CV Score</h3>
          <p className="text-3xl font-bold text-blue-800 mt-2">{originalScore}%</p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm bg-green-50">
          <h3 className="text-lg font-medium text-green-600">Optimized CV Score</h3>
          <p className="text-3xl font-bold text-green-800 mt-2">{optimizedScore}%</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Optimized CV</h3>
        <div className="bg-gray-100 border border-gray-300 p-4 rounded-lg overflow-auto whitespace-pre-wrap max-h-[400px] text-sm text-gray-800">
          {optimizedCV}
        </div>
        <div className="text-center mt-4">
          <button
            onClick={handleDownload}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium px-6 py-2 rounded-lg shadow hover:from-emerald-600 hover:to-green-500 transition-all"
          >
            Download Optimized CV
          </button>
        </div>
      </div>
    </div>
  );
}
