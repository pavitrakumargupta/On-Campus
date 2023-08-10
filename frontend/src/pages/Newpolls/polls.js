import React, { useEffect, useState } from 'react';
import CreatePoll from './CreatePoll';
import PollList from './PollList';
import "./polls.css"
import { useSelector } from "react-redux";
import axios from '../../axios';

function App() {
  const [polls, setPolls] = useState([]);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const user = useSelector((state) => state);
  

  useEffect(()=>{
    getAllPolls()
  },[])
  const getAllPolls=async()=>{
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.details.token}`,
        },
      };
      const {data}=await axios.get("/Polls/getAllPolls",config)
      setPolls(data)
    } catch (error) {
      error.response.status==401&&(window.location.href = "/login")
    }
  }

  const createPoll = async (newPoll) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.details.token}`,
        },
      };
      const newPollModel={
        question:newPoll.question,
        options:[]
      }
      newPoll.options.map(key=>{
        newPollModel.options.push({
          optionName:key
        })
      })
      const {data}=await axios.post("/Polls/createNewPoll",newPollModel,config)
     
      setPolls([...polls, data])
    } catch (error) {
      console.log(error);
      error.response.status==401&&(window.location.href = "/login")
    }
  };

  const selectPoll = (poll) => {
    setSelectedPoll(poll);
  };

  return (
    <div className="polls">
      <h1> Like the Poll you Like</h1>
      
        <div>
          <CreatePoll createPoll={createPoll} />
          
          <div className="poll-list">
            <h2>Polls List</h2>
            {polls.length === 0 ? (
              <p>No polls available. Create a new one!</p>
            ) : (
              <ul>
                {polls.map((poll,index) => (
                    <PollList poll={poll} index={index} />
              ))}
              </ul>
            )}
          </div>
        </div>
       
    </div>
  );
}

export default App;
