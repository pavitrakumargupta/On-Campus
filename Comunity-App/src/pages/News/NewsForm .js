import React, { useState } from 'react';
import UploadImage from "../../uploadImage";
import { MdOutlineDeleteOutline } from "react-icons/md";

const NewsForm = ({ onSubmit }) => {
  const newsInit={
    title:"",
    subTitle:"",
    date:"",
    deadline:"",
    document:""
  }
  const [news,setNews]=useState(newsInit)

  const handleChange=(event)=>{
    const {name,value}=event.target
    const newsCopy={...news}
    newsCopy[name]=value
    setNews(newsCopy)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(news);
    setNews(newsInit);
     
  };


  const [imagePath, setimagePath] = useState("");
  const [Image, setImage] = useState("");

  const handleNotesUpload = async (event) => {
    const ImagDetails = await UploadImage(event.target.files[0],"news", "upload");
    setImage(event.target.files[0].name);
    setimagePath(ImagDetails.pathname);
    const newsCopy={...news}
    newsCopy.document=ImagDetails.url
    setNews(newsCopy)
  };
  const handleNotesDelete = async () => {
    const deleteImage = await UploadImage(imagePath, "delete");
    setImage("");
    setimagePath("");
    setNews(...prevValue=>({...prevValue,["document"]: ""}))
  };
  return (
    <div className="news-form-container">
      <h2 className="news-form-title">Create News</h2>
      <form onSubmit={handleSubmit} className="news-form">
      <span style={{fontSize:"12px",color:"red"}}>*Required</span>
      <div style={{display:"flex",gap:"10px",flexDirection:"column",background:" "}}>
        <label htmlFor="">Title</label>
          <input
            type="text"
            placeholder="News Title"
            name='title'
            onChange={handleChange}
            value={news.title}
            className="news-form-input"
          />
          <label htmlFor="">Subtitle</label>
          <textarea name='subTitle'
              placeholder="News Subtitle"
            value={news.subTitle}
            onChange={handleChange}
            className="news-form-input" cols="30" rows="5"></textarea>
      </div>
      
        
        <span style={{fontSize:"12px",color:"red"}}>*optional</span>
        <div>
        <label htmlFor="">Deadline Date </label>
        <input
          type="date"
          placeholder="deadline"
          name='deadline'
          value={news.deadline}
          onChange={handleChange}
          className="news-form-input"
        />
 
        <label htmlFor="">Document</label>
        
        <div className="imageSection">
          <input className="imageInput"    type="file"   onChange={handleNotesUpload} id="file" />
            <div className="imageUpload" >
            <img  src="https://www.efilecabinet.com/wp-content/uploads/2019/05/upload-01.png" alt="" />
              <button >Upload Supported Document</button>
            </div>
          </div>
          {news.document !== "" && (
              <div  className="UploadedBox">
                <embed className="UploadedImage" src={news.document} type="" />
                <p>{Image.substring(0, 5)}... {Image.substring(Image.length - 4)}</p>
                <MdOutlineDeleteOutline
                  onClick={handleNotesDelete}
                  className="dleteImage"
                />
              </div>
            )}
        </div>
        
        <button type="submit" className="news-form-button">
          Submit
        </button>
      </form>
    </div>
  );
   
};

export default NewsForm;
