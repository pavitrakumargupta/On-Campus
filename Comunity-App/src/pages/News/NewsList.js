import React from 'react';
 

const NewsList = ({ newsItems }) => {
  return (
    <div className="news-list-container">
      <h2 className="news-list-title">Latest News</h2>
      <ul className="news-list">
        {newsItems.map((item, index) => (
          <li key={index} className="news-list-item">
            <div className="news-list-item-news">{item.news}</div>
              <h5>{item.title}</h5>
              <p>{item.subTitle}</p>
            <div>
              <p>Date- <span>{item.deadline}</span></p>
            {item.document&&<embed
                  src={item.document}
                  className="modal-document-embed"
                  style={{width:"200px",height:"200px"}}
                />}
            </div>
            <div className="news-list-item-date">{item.date}</div>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
