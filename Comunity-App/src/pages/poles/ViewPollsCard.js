import React from "react";
// import "./ViewPollsCard.css"; // Custom CSS file for styling

// Poll list component
const ViewPollsCard = ({ polls }) => {
  return (
    <div className="poll-list-container">
      <h2>All Polls</h2>
      <ul className="poll-list">
        {polls.map((poll, index) => (
          <li key={index} className="poll-item">
            <h3 className="poll-question">Question: {poll.question}</h3>
            <ul className="poll-options">
              {poll.options.map((option, index) => (
                <div>
                <label htmlFor="">Option {index + 1}:</label>
                <li
                    key={index}
                    className="poll-option"
                    style={{ backgroundColor: option.background,color:option.color,marginTop:"10px" }}
                  >
                    
                    <span className="option-text">{option.optionText}</span>
                  </li>
                </div>
          ))}
        </ul>
      </li>
    ))}
  </ul>
</div>
);
};

export default ViewPollsCard;
