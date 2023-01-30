import React, { useState } from 'react';
import GenerateArticle from './GenerateArticle';

function Form() {
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      const json = await res.json();
      setResponse(json.response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section><GenerateArticle />
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Submit</button>
      {response && <section>{response}</section>}
    </form></section>
    
  );
}

export default Form;