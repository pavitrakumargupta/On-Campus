import React, { useState } from "react";
// import "./CreatePollCard.css"; // Custom CSS file for styling
// Poll creation component
const CreatePollCard = ({ onPollCreated }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([{ optionText: "", color: "#000000",background:"#ffffff"}]);

  // Handle question input change
  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  // Handle option input change
  const handleOptionChange = (e, index) => {
    const updatedOptions = [...options];
    updatedOptions[index].optionText = e.target.value;
    setOptions(updatedOptions);
  };

  // Handle color input change
  const handleColorChange = (name,color, index) => {
    const updatedOptions = [...options];
    updatedOptions[index][name] = color;
    setOptions(updatedOptions);
  };

  // Handle adding a new option
  const handleAddOption = () => {
    setOptions([...options, { optionText: "", color: "#000000",background:"#ffffff" }]);
  };

  // Handle poll submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate if question and options are filled
    if (question && options.every((option) => option.optionText !== "" && option.color !== "")) {
      // Pass poll data to parent component for further processing
      onPollCreated({ question, options });
      // Reset form
      setQuestion("");
      setOptions([{ optionText: "",color: "#000000",background:"#ffffff"}]);
    } else {
      alert("Please fill in both the question and options.");
    }
  };

  return (
    <div className="create-poll-container">
      <h2>Create Poll</h2>
      <form onSubmit={handleSubmit} className="poll-form">
        <label>
          Question:
          <input
            type="text"
            value={question}
            onChange={handleQuestionChange}
            className="poll-input"
          />
        </label>
        {options.map((option, index) => (
          <div key={index} className="option-container">
            <label>
              Option {index + 1}:
              <input
                type="text"
                value={option.optionText}
                onChange={(e) => handleOptionChange(e, index)}
                className="poll-input"
              />
            </label>
            <label>
              #background: 
              <input
                type="color"
                name="background"
                value={option.background}
                onChange={(e) => handleColorChange(e.target.name,e.target.value, index)}
                className="color-input"
              />
            </label>
            <label>
              Color:
              <input
                type="color"
                name="color"
                value={option.color}
                onChange={(e) => handleColorChange(e.target.name,e.target.value, index)}
                className="color-input"
              />
            </label>
          </div>
        ))}
        <div className="add_submitBtn">
          <button type="button" onClick={handleAddOption} className="add-option-btn"> Add Option </button>
          <button type="submit" className="create-poll-btn">Create Poll</button>
        </div>
        
      </form>
    </div>
  );
};
export default CreatePollCard;
