import React, { useState } from 'react';

export default function MiniAssignments({ gaps }) {
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [submittedIndexes, setSubmittedIndexes] = useState({});

  const parseGaps = (gapsText) => {
    const lines = gapsText.split('\n').filter(line => line.trim().startsWith('-'));
    return lines.map(line => {
      const [skill, assignment] = line.slice(1).split(':');
      return {
        skillGap: skill?.trim(),
        miniAssignment: assignment?.trim()
      };
    });
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    setUploadedFiles(prev => ({ ...prev, [index]: file }));
  };

  const handleFileSubmit = (index) => {
    if (uploadedFiles[index]) {
      setSubmittedIndexes(prev => ({ ...prev, [index]: true }));
    } else {
      alert('Please select a file before submitting.');
    }
  };

  const parsedAssignments = parseGaps(gaps);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-8">
        Mini Assignments Based on Your Skill Gaps
      </h2>
      <div className="space-y-6">
        {parsedAssignments.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row justify-between gap-6 items-start md:items-center"
          >
            <div className="md:w-1/2">
              <p className="text-gray-800 font-semibold">
                <strong>Skill Gap:</strong> <span className="font-normal">{item.skillGap}</span>
              </p>
            </div>
            <div className="md:w-1/2">
              <p className="text-gray-700">
                <strong>Mini Assignment:</strong> {item.miniAssignment}
              </p>
              <input
                type="file"
                className="mt-2 block w-full text-sm text-gray-700 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={(e) => handleFileChange(e, index)}
              />
              <button
                onClick={() => handleFileSubmit(index)}
                className="mt-3 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300 ease-in-out"
              >
                Submit
              </button>
              {submittedIndexes[index] && (
                <div className="mt-2 text-green-600 font-medium">
                  Feedback: File received! We’ll review your submission shortly.
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
