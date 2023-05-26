import React from 'react';
import { Link } from 'react-router-dom';

function QuestionList({ questions }) {
  return (
    <ul className="question-list">
      {questions.map((question) => (
        <li key={question.id}>
          <Link to={`/questions/${question.id}`}>
            <h2>{question.title}</h2>
            <p>{question.description}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default QuestionList;
