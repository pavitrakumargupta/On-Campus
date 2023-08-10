import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import axios from '../../axios';
import Loader from "../../assets/loader.gif";

function PollList({ poll, index }) {
  const [pollDetail, setPollDetail] = useState({
    pollId: poll._id,
    oldOptionId: "",
    newOptionId: ""
  });
  const user = useSelector((state) => state);
  const [loading, setLoading] = useState(true);
  const [Poll,setPoll]=useState(poll)

  const setNewOptionId = (e) => {
    setPollDetail({ ...pollDetail, newOptionId: e.target.value });
  };

  useEffect(() => {
    const fetchPreviousVote = async () => {
      try {
        const previousOption = poll.totalVotes.find((key) => key.user === user.details._id);
        if (previousOption) {
          setPollDetail({ ...pollDetail, oldOptionId: previousOption.optionId });
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchPreviousVote();
  }, [poll, user]);

  const voteforOption = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.details.token}`,
        },
      };
      const { data } = await axios.post("/Polls/pollVote", pollDetail, config);
      setPollDetail({...pollDetail,oldOptionId:pollDetail.newOptionId,newOptionId:""})
      setPoll(data)

    } catch (error) {
      if (error.response.status === 401) {
        window.location.href = "/login";
      }
    }
  };

  if (loading) {
    return <img src={Loader} alt="Loading..." />;
  }

  

  return (
    <li key={index} className="poll-item">
      <h3>{Poll.question}</h3>
      <form className="poll-form">
        {Poll.options.map((option, optionIndex) => (
          <div key={optionIndex} className="form-group">
            <input
              type="radio"
              value={option._id}
              name={`poll_${index}`}
              id={`option_${index}_${optionIndex}`}
              onChange={setNewOptionId}
              defaultChecked={pollDetail.oldOptionId === option._id}
            />
            <label htmlFor={`option_${index}_${optionIndex}`}>{option.optionName}</label>
            {/* {console.log((option.vote *100),poll.totalVotes.length)} */}
            <label htmlFor="">{(option.votes / Poll.totalVotes.length) * 100} %</label>

          </div>
        ))}
        <button disabled={pollDetail.newOptionId===""} style={pollDetail.newOptionId===""?{background:"grey"}:{}} onClick={voteforOption} type="button">{pollDetail.oldOptionId?"Change Vote":"Vote"}</button>
      </form>
    </li>
  );
}

export default PollList;
