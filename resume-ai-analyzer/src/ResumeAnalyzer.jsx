import React, { useState, useRef } from 'react';

function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [score, setScore] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef();

  const keywords = ['React', 'JavaScript', 'Node.js', 'HTML', 'CSS', 'Python'];

  const analyzeResume = (text) => {
    const lower = text.toLowerCase();
    const matchedKeywords = keywords.filter(k => lower.includes(k.toLowerCase()));

    const baseScore = Math.min(100, matchedKeywords.length * 15);
    const sugg = [];

    if (matchedKeywords.length < 2)
      sugg.push('Add more technical keywords relevant to your field.');
    if (!text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}/i))
      sugg.push('Include a professional email address.');

    setScore(baseScore);
    setSuggestions(sugg);
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile && selectedFile.type === 'text/plain') {
      const txt = await selectedFile.text();
      setText(txt);
      analyzeResume(txt);
    } else {
      alert('Please upload a plain text (.txt) resume for demo analysis.');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h1>AI Resume Analyzer (React)</h1>

      <input
        type="file"
        accept=".txt"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ margin: '10px 0' }}
      />

      {file && <p><strong>File:</strong> {file.name}</p>}

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your resume text here..."
        rows="8"
        style={{ width: '100%', padding: '10px', marginTop: '10px' }}
      />

      <button
        onClick={() => analyzeResume(text)}
        style={{ padding: '10px 15px', marginTop: '10px', cursor: 'pointer' }}
      >
        Analyze Resume
      </button>

      {score !== null && (
        <div style={{ marginTop: '20px' }}>
          <h3>Score: {score}/100</h3>
          <h4>Suggestions:</h4>
          <ul>
            {suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ResumeAnalyzer;
