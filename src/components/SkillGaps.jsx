import React, { useState } from 'react';

export default function SkillGaps({ gaps }) {
  const skillLines = gaps.split('\n').filter((l) => l.startsWith('- '));

  const parsedSkills = skillLines.map((line, index) => {
    const match = line.match(/- (.*?): (.*)/);
    return match
      ? { id: index, skill: match[1], snippet: match[2] }
      : { id: index, skill: 'Unknown', snippet: line };
  });

  const [submitted, setSubmitted] = useState({});

  const handleSimulate = (id) => {
    setSubmitted((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white p-8 rounded-xl shadow-xl space-y-4">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">
        Skill Gaps & Mini Assignments
      </h2>

      {parsedSkills.map(({ id, skill, snippet }) => (
        <div
          key={id}
          className="p-6 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <p className="text-lg font-semibold text-indigo-600">{skill}</p>
              <p className="text-gray-700 mt-1">{snippet}</p>
            </div>
            <div>
              {!submitted[id] ? (
                <button
                  onClick={() => handleSimulate(id)}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-4 py-2 rounded-md shadow transition"
                >
                  Simulate Submission
                </button>
              ) : (
                <p className="text-green-600 font-medium">✅ Submitted. Great job!</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
