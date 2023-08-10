import React, { useEffect, useState } from 'react';
import {UploadImage,DeleteImage} from "../../uploadImage";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import verifyImageByUrl  from "../../verifyImageByUrl"

const NewsForm = ({ onSubmit }) => {
  const user = useSelector((state) => state);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are 0-indexed, so we add 1
  const day = currentDate.getDate();
  const newsInit={
    title:"",
    subTitle:"",
    date:`Posted on: ${year}-${month}-${day}`,
    deadline:"",
    document:"",
    createdBy:{name:user.details.name,
      profilePitchure:user.details.profilePicture
    }
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
    if(news.title&& news.subTitle){
      onSubmit(news);
      setNews(newsInit);
    }     
  };


 

  

  useEffect(()=>{},[news])

  const handleNotesDelete = async () => {
    const deleteImage = await UploadImage(news.document);
    setNews(prevValue=>({...prevValue,document: ""}))
  };

  const uploadButtonHandler = (field) => {
    let elem = document.getElementById('fileUpload');
    if (elem) elem.click();
}
const handleNewsDocUpload = async (event) => {
  const ImageUrl = await UploadImage(event.target.files[0],"news");
  const {decodedFilename}=verifyImageByUrl(ImageUrl)
 
  const newsCopy={...news}
  newsCopy.document=ImageUrl
  setNews(newsCopy)
};

const uploadImage=()=>{
  
  const {isImage,decodedFilename}=verifyImageByUrl(news.document)

  return <div  className="UploadedBox">

  {isImage?<img className="docPreview" src={news.document} alt="Image Preview" />:
    <iframe
    src={`https://docs.google.com/viewer?url=${encodeURIComponent(news.document)}&embedded=true`}
    className="docPreview"
    frameborder="0"
  />
  }
  <p>{decodedFilename.substring(0, 5)}... {decodedFilename.substring(decodedFilename.length - 4)}</p>
   
  <i onClick={handleNotesDelete} class="fa-solid fa-trash"></i>
</div>
}

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
          <input className="imageInput"  id="fileUpload"  type="file"   onChange={handleNewsDocUpload}   />
            <div className="imageUpload" >
            <img onClick={uploadButtonHandler}  src="https://static.vecteezy.com/system/resources/previews/006/563/745/original/add-new-file-upload-button-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg" alt="" />
            </div>
          </div>
          {news.document !== "" && (uploadImage())}
        </div>
        
        <button type="submit" className="news-form-button">
          Submit
        </button>
      </form>
    </div>
  );
   
};

export default NewsForm;
