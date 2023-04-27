import React, { useState } from 'react';
import NewsForm from './NewsForm ';
import NewsList from './NewsList';
import './News.css'; // Import CSS file for global styling

const News = () => {
  const [newsItems, setNewsItems] = useState([]);

  const handleNewsSubmit = (newsItem) => {
    // Add news item to the list of news items
    setNewsItems([...newsItems, newsItem]);
  };

  return (
    <div className="News-container">
      {/* <h1 className="News-title">College News App</h1> */}
      <div>
        <NewsForm onSubmit={handleNewsSubmit} />
        <NewsList newsItems={newsItems} />
      </div>
      
    </div>
  );
};

export default News;
