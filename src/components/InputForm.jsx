import React from 'react';

export default function InputForm({
  cvText,
  setCvText,
  jdText,
  setJdText,
  handleMatchAndScore,
  loading,
}) {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl space-y-6">
      <div>
        <label className="block text-lg font-semibold mb-2 text-gray-700">
          Candidate CV
        </label>
        <textarea
          className="w-full min-h-[150px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 resize-y"
          value={cvText}
          onChange={(e) => setCvText(e.target.value)}
          placeholder="Paste your CV here..."
        />
      </div>

      <div>
        <label className="block text-lg font-semibold mb-2 text-gray-700">
          Job Description
        </label>
        <textarea
          className="w-full min-h-[150px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 resize-y"
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
          placeholder="Paste the job description here..."
        />
      </div>

      <div className="text-center">
        <button
          onClick={handleMatchAndScore}
          disabled={loading}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 text-white shadow-lg'
          }`}
        >
          {loading ? 'Matching...' : 'Match & Score CV'}
        </button>
      </div>
    </div>
  );
}
