import React, { useState } from 'react';

const GeminiForm = () => {
  const [post1, setPost1] = useState('');
  const [post2, setPost2] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/give-me-answer', {
        method: 'POST',
        headers: {},
        body: JSON.stringify({ post1, post2 }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Gemini AI Art Comparison</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="post1">Art 1:</label>
          <input
            type="text"
            id="post1"
            value={post1}
            onChange={(e) => setPost1(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="post2">Art 2:</label>
          <input
            type="text"
            id="post2"
            value={post2}
            onChange={(e) => setPost2(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Comparing...' : 'Compare'}
        </button>
      </form>

      {result && (
        <div className="output">
          <h2>Comparison Result</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </>
  );
};

export default GeminiForm;
