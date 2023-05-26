import React from 'react';

function QuestionDetails({ question }) {
  return (
    <div className="question-details">
      <h2>{question.title}</h2>
      <p>{question.description}</p>
      <h3>Comments</h3>
      <CommentList comments={question.comments} />
    </div>
  );
}

function CommentList({ comments }) {
  return (
    <ul className="comment-list">
      {comments.map((comment) => (
        <li key={comment.id}>
          <p>{comment.text}</p>
        </li>
      ))}
    </ul>
  );
}

export default QuestionDetails;
