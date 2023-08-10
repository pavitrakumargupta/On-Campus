import React from 'react';
import verifyImageByUrl  from "../../verifyImageByUrl"

const NewsList = ({ newsItems }) => {


  const uploadPreview=(url)=>{
    const {isImage}= verifyImageByUrl(url)
     return (<div  style={{display:"flex",justifyContent:"center"}}  >
     {isImage?<img className="docPreview" style={{width:"200px",height:"200px"}} src={url} alt="Image Preview" />:
         <iframe
         style={{width:"200px",height:"200px",margin:"auto"}}
         src={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`}
         className="docPreview"
         frameborder="0"
     />
     }
 </div>)}

  return (
    <div className="news-list-container">
      <h2 className="news-list-title">Latest News</h2>
      <ul className="news-list">
        {newsItems.slice().reverse().map((item, index) => (
          <li key={index} className="news-list-item">
            <div className="news-list-item-news">{item.news}</div>
              <h5>Title -: {item.title}</h5>
              <p>Subtittle -: {item.subTitle}</p>
            <div>
               
              {item?.deadline&&<p>Deadline- <span>{item?.deadline}</span></p>}
             
              
            {item.document&&uploadPreview(item.document)}
            </div>
            <div className="news-list-item-date">
              <p>{item.date}</p> 
              <div>
                <img src={item.createdBy.profilePitchure} alt="" />
                <p>{item.createdBy.name} </p>
              </div>
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
