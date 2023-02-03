import React, { useState } from 'react';

function UnitPlan() {
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');
  const [subject, setSubject] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://ai-node-app.herokuapp.com/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, subject }),
      });
      const json = await res.json();
      var responseText = json.data.split(/\n\n|\n/) //added line
      setResponse(responseText);
    } catch (err) {
      console.error(err);
    }
  };

  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Submit Prompt</button>
      {response && <p>{response}</p>}
      <p>{response.map((textParcel, index) => (
        <p key={index}>{textParcel}</p>
      ))}</p>
    {/* Need to split then add each of those to an array, then display them one by one */}
    </form>
  );
}

export default UnitPlan;