import React, { useEffect, useState } from 'react';
import NewsForm from './NewsForm ';
import NewsList from './NewsList';
import './News.css'; // Import CSS file for global styling
import axios from "../../axios";
import { useSelector } from "react-redux";
 
    
const News = () => {
  const user = useSelector((state) => state);
  const [newsItems, setNewsItems] = useState([]);
  
  const fetchAllNews=async()=>{
    const config = {
      headers: {
        Authorization: `Bearer ${user.details.token}`,
      },
    };
    try {
      const {data}=await axios.get("/News/getAllNews",config)
      setNewsItems(data)
    } catch (error) {
      error.response.status==401&&(window.location.href = "/login")
    }
  }
  useEffect(()=>{
    fetchAllNews()
  },[])
  

  const handleNewsSubmit = async(newsItem) => {
    // Add news item to the list of news items
    const config = {
      headers: {
        Authorization: `Bearer ${user.details.token}`,
      },
    };
    try {
      const {data}=await axios.post("News/uploadNews",newsItem,config)
    } catch (error) {
      error.response.status==401&&(window.location.href = "/login")
      
    }
    setNewsItems([...newsItems, newsItem]);
  };

  return (
    <div className="News-container">
      {/* <h1 className="News-title">College News App</h1> */}
      <div>
      <NewsList newsItems={newsItems} />
        <NewsForm onSubmit={handleNewsSubmit} />
        
      </div>
      
    </div>
  );
};

export default News;
