import React, { useState } from 'react';
import './question.css';

import QuestionList from './QuestionList';
import QuestionForm from './QuestionForm';
import QuestionDetails from './QuestionDetails';
import CommentForm from './CommentForm';

function App() {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleQuestionSubmit = (question) => {
    const newQuestion = {
      id: questions.length + 1,
      title: question.title,
      description: question.description,
      comments: []
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleCommentSubmit = (questionId, comment) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        const updatedComments = [...question.comments, comment];
        return { ...question, comments: updatedComments };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <QuestionForm onSubmit={handleQuestionSubmit} />
          </div>
          <div className="col-md-6">
            <QuestionList
              questions={questions}
              onSelect={(question) => setSelectedQuestion(question)}
            />
          </div>
        </div>
        {selectedQuestion && (
          <div className="row mt-4">
            <div className="col-md-6">
              <QuestionDetails question={selectedQuestion} /> 
              <CommentForm
                questionId={selectedQuestion.id}
                onSubmit={handleCommentSubmit}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
