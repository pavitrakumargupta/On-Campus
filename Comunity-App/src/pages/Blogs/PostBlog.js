import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";
import {UploadImage,DeleteImage} from "../../uploadImage";
import verifyImageByUrl from "../../verifyImageByUrl";

const PostBlog = ({ user, handleSubmitBlog, closeWindow,BlogDetail }) => {
  const [Image, setImage] = useState("");
  const [NewpostDetails, setNewPostDetails] = useState({
    type: BlogDetail!==null?BlogDetail.type:"",
    tittle: BlogDetail!==null?BlogDetail.tittle:"",
    content: BlogDetail!==null?BlogDetail.content:"",
    coverImageLink: BlogDetail!==null?BlogDetail.coverImageLink:"",
    userName: user.details.username,
    userId: user.details._id,
    userImage:user.details.profilePitchure,
    comment: BlogDetail!==null?BlogDetail.comment:[],
    Like: BlogDetail!==null?BlogDetail.Like:[],
  });

  const [PostbtnDisabled, setPostbtnDisabled] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    let NewpostDetailsCopy = { ...NewpostDetails };
    NewpostDetailsCopy[name] = value;
    setNewPostDetails(NewpostDetailsCopy);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPostbtnDisabled(true);
    handleSubmitBlog(NewpostDetails,BlogDetail!==null?BlogDetail._id:"");
  };

 
  const [imagePath, setimagePath] = useState("");

  const handleImageUpload = async (event) => {
    const ImagDetails = await UploadImage(event.target.files[0]);
    setImage(event.target.files[0].name  );
    const {decodedFilename}=verifyImageByUrl(ImagDetails)
    setimagePath(decodedFilename);
    let NewpostDetailsCopy = { ...NewpostDetails };
    NewpostDetailsCopy.coverImageLink = ImagDetails;
    setNewPostDetails(NewpostDetailsCopy);
  };

  const handleImageDelete = async () => {
    const deleteImage = await UploadImage(imagePath, "delete");
    setImage("");
    setimagePath("");
    let NewpostDetailsCopy = { ...NewpostDetails };
    NewpostDetailsCopy.coverImageLink = "";
    setNewPostDetails(NewpostDetailsCopy);
  };

  return (
    <div className="postBlogPage">
      <AiFillCloseCircle
        className="close"
        onClick={() => {
          closeWindow();
        }}
      />

      <div className="CreatePostWIndow">
        <div>
          <label htmlFor="">
            Blog Type <span>(*optional)</span>
          </label>
          <input
            onChange={handleChange}
            name="type"
            placeholder="Enter Blog Type"
            type="text"
            value={NewpostDetails.type}
          />
        </div>
        <div>
          <label htmlFor="">Tittle</label>
          <input
            onChange={handleChange}
            name="tittle"
            placeholder="Enter Tittle"
            type="text"
            value={NewpostDetails.tittle}
          />
        </div>
        <div>
          <label htmlFor="">Content</label>
          <textarea
            placeholder="Enter the the Blog Content"
            onChange={handleChange}
            name="content"
            id=""
            cols="30"
            rows="10"
            value={NewpostDetails.content}
          ></textarea>
        </div>
        <div className="ImageUpload">
          <label>Upload Cover Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />

          <div>
            <img
              src="https://img.freepik.com/premium-vector/gallery-simple-icon-vector-image-picture-sign-neumorphism-style-mobile-app-web-ui-vector-eps-10_532800-801.jpg"
              alt=""
            />
            <button>Browse Cover Image</button>
          </div>
          
        </div>
        
        <div>
          <label style={{textAlign:"center",marginBottom:"20px"}} htmlFor="">*Or Enter ImageLink Directly</label>
          <input onChange={handleChange} type="text" placeholder="Eg- : https://www.abc.com " name="coverImageLink"  value={NewpostDetails.coverImageLink}  />
        </div>
        {NewpostDetails.coverImageLink !== "" && (
              <div className="UploadedBox">
                <img
                  className="UploadedImage"
                  src={NewpostDetails.coverImageLink}
                />
                <p>{Image}</p>
                {imagePath&&<MdOutlineDeleteOutline
                  onClick={handleImageDelete}
                  className="dleteImage"
                />}
              </div>
            )}
        <button
          className="postBlogWindowBtn PostBtn"
          disabled={PostbtnDisabled}
          onClick={handleSubmit}
        >
          Post Blog
        </button>
      </div>
    </div>
  );
};

export default PostBlog;
