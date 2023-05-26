import React, { useState } from 'react';

function CommentForm({ onSubmit }) {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ text });
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text">Add a comment:</label>
      <textarea
        id="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CommentForm;
