import React from 'react';
 
function Dashboard() {
  return (
    <div className="dashboard container-fluid">
      <div className="row">
        <div className="col-md-3 col-sm-12 sidebar">
          <ul>
            <li className="dashboard">Dashboard</li>
            <li className="messaging">Messaging</li>
            <li className="blogs">Blogs</li>
            <li className="polls">Polls</li>
            <li className="news">News</li>
            <li className="notes">Notes</li>
            <li className="questions">Questions</li>
            <li className="join">Join Community</li>
            <li className="friends">Find Friends</li>
            <li className="chat">Chat with Friends</li>
          </ul>
        </div>
        <div className="col-md-9 col-sm-12 content">
          {/* Content area */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
