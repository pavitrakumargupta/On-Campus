import React, { useState } from 'react';

function CreatePoll({ createPoll }) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleOptionChange = (e, index) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPoll({ question, options });
    setQuestion('');
    setOptions(['', '']);
  };

  return (
    <div className="create-poll">
      <h2>Create a New Poll</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Question:</label>
          <input
            type="text"
            value={question}
            onChange={handleQuestionChange}
            required
            placeholder='question'
          />
        </div>
        <div className="form-group form-option">
          <label>Options:</label>
          
          {options.map((option, index) => (
            <input
              type="text"
              key={index}
              value={option}
              onChange={(e) => handleOptionChange(e, index)}
              required
              placeholder={`Enter option Value`}
            />
          ))}
          <button type="button" onClick={addOption}>
            Add Option
          </button>
        </div>
        <button type="submit">Create Poll</button>
      </form>
    </div>
  );
}

export default CreatePoll;
