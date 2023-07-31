import React, { useState } from "react";
import ViewPollsCard from "./ViewPollsCard";
import CreatePollCard from "./CreatePollCard";
import "./polls.css"; // Custom CSS file for styling

// Main App component
const App = () => {
  const [polls, setPolls] = useState([]);

  // Handle poll creation
  const handlePollCreated = (pollData) => {
    setPolls([...polls, pollData]);
  };

  return (
    <div className="app-container">
      <CreatePollCard onPollCreated={handlePollCreated} />
      <ViewPollsCard polls={polls} />
    </div>
  );
};
export default App;
