import React from 'react';

export default function SkillGaps({ gaps }) {
  const parseGaps = (gapsText) => {
    const lines = gapsText.split('\n').filter(line => line.trim().startsWith('-'));
    return lines.map((line, index) => {
      const [skill, detail] = line.slice(1).split(':');
      return {
        skillGap: skill?.trim(),
        description: detail?.trim()
      };
    });
  };

  const parsed = parseGaps(gaps);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Skill Gaps Identified</h2>
      <ul className="space-y-4">
        {parsed.map((gap, idx) => (
          <li key={idx} className="bg-white shadow-md rounded-md p-4">
            <p className="text-lg font-semibold text-gray-800">Skill Gap: {gap.skillGap}</p>
            <p className="text-gray-700 mt-1">{gap.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
