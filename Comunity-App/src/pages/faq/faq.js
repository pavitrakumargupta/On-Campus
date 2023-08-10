import React, { useEffect, useState } from 'react';
import './faq.css';
import axios from '../../axios';
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [answers, setComments] = useState([]);
  const [newComment,setNewComments]=useState("")
  const [openQuestion,setOpenQuestion]=useState()

  useEffect(()=>{
    getAllFaq()
  },[])
  
  const getAllFaq=async()=>{
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.details.token}`,
        },
      };
      const {data}=await axios.get("/faq/getAllfaq",config)
      setQuestions(data)
    } catch (error) {
      error.response.status==401&&(window.location.href = "/login")
    }
  }

  const handleChange = (event) => {
    setNewQuestion(event.target.value);
  };

  const handlePostQuestion =async () => {
    if (newQuestion.trim() === '') return;
    setNewQuestion('');
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.details.token}`,
        },
      };
      const {data}=await axios.post("/faq/uploadFaq",{ question: newQuestion, answers: []},config)
      const questionCopy=[...questions,data]
     
      setQuestions(questionCopy)
    } catch (error) {
      console.log(error);
      error.response.status==401&&(window.location.href = "/login")
    }
  };

  const handleAddComment = async(commentText) => {
    if (commentText.trim() === '') return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.details.token}`,
        },
      };
      const {data}=await axios.post("/faq/addAnswer",
      {_id:openQuestion._id, answer:{user:user.details._id,content:commentText}},config)
      let questionIndex=questions.indexOf(openQuestion)
      const updatedQuestions = [...questions];
      updatedQuestions[questionIndex].answers=data;
      setNewComments("")
      setQuestions(updatedQuestions);
      let OpenQuestionCopy=openQuestion
      OpenQuestionCopy.answers=data;
      setOpenQuestion(OpenQuestionCopy)
      // setComments([...answers, { questionIndex, question: commentText }]);
    } catch (error) {
      error.response.status==401&&(window.location.href = "/login")
    }
   
   
  };

  const specificQuestion=(key=openQuestion)=>{
    return <div className='openedQuestion'> 
       <p><b>Question</b>   <i class="fa-solid fa-arrow-right-to-bracket">
          </i> <span style={{marginLeft:"13px"}}>{key.question}</span> 
        </p>
      <div className="comment-section">
     
    <div  style={{display:'flex',alignItems:"center",gap:"10px"}}>
    <textarea
      placeholder="Answer a question..."
      onChange={(e) => setNewComments(e.target.value)}
      value={newComment}
    />
     <i onClick={()=>handleAddComment(newComment)} 
     style={{fontSize:"20px"}} class="fa-solid fa-paper-plane"></i>
    </div>
    
    {key.answers.length>0&&<div className="comments">
      {key.answers.map((comment, commentIndex) => (
        <div>
            <p key={commentIndex}>{comment.content}</p>
        </div>
        
      ))}
    </div>}
  </div>
    <button onClick={()=>{ setOpenQuestion();setNewComments("")}}>{ "click to close" }</button>
  </div>
  }

  return (
    <div className="faq">
      {questions.length>0&&<div className='questions'>
        <h2 style={{margin:"0 auto"}}>Questions that have been asked</h2>
        {!openQuestion&&questions?.slice().reverse().map((question, index) => (
          <div className="question" key={index}>
            <div style={{width:"100%",display:'flex',alignItems:"center",gap:"10px",justifyContent:"space-between"}}>
              <p><b>Question</b>   <i class="fa-solid fa-arrow-right-to-bracket"></i> <span style={{marginLeft:"13px"}}>{question.question}</span> </p>
              <p style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <i  class="fa-solid fa-arrow-up-long"></i>
                <span>Vote Up</span>
              </p>
            </div>
            <br />
            <button onClick={()=>{ setOpenQuestion(question)}}>{"Click to answer"}</button>
            
          </div>
          
        ))}
        {openQuestion&&specificQuestion(openQuestion)}
        
      </div>}
      <div className="question-section">
        
        <h1>Ask Anything</h1>
        <div className="ask-form">
          <textarea
            placeholder="Ask your question..."
            value={newQuestion}
            onChange={handleChange}
          />
          <button onClick={handlePostQuestion}>Post Question</button>
        </div>
        </div>
        
        
    </div>
  );
};

export default App;
