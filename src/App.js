import React, { useState } from 'react';

function Form() {
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://ai-node-app.herokuapp.com/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      const json = await res.json();
      setResponse(json.response.data);
      console.log(response + "from the server");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Submit Prompt</button>
      {response && <section>{response}</section>}
    </form>
  );
}

export default Form;