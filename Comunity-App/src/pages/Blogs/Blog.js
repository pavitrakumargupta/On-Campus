import React, { useState, useEffect  } from "react";
import "./Blog.css";
import CoverImage from "./img/coverImage.gif";
import { AiFillLike, AiOutlineLike, AiFillCloseCircle } from "react-icons/ai";
import { FaRegCommentDots, FaCommentDots } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
 

const Blog = () => {
  const user = useSelector((state) => state);

  const navigate=useNavigate()
  useEffect(()=>{
     if(user.details==="unset"){
        navigate("/")
     }
   
  },[])

  const BlogType = [
    "All",
    "Coding",
    "Education",
    "Financial",
    "Sports",
    "Other",
  ];
 
 
  const [Blogs, setBlogs] = useState([]);

  const [activeBlog, setActiveBlog] = useState(null);
  const [comment, setComment] = useState(false);
  const [input_commnet, setInputComment] = useState("");
  const [postBlog, setpostBlog] = useState(false);

  useEffect(()=>{
     const fetchBlogsData=async()=>{
      const response = await axios.get("http://localhost:5000/getAllPost");
      setBlogs(response.data)
     }
     fetchBlogsData()
  },[])
 
  const openBlog = () => {
    const handleComment = (event) => {
      const { value } = event.target;
      let message = value.replace(/\s{3,}/g, " ");
      if (!/\S/.test(message)) {
        message = message.replace(/\s+/g, "");
      }
      setInputComment(message);
    };

    const postComment = () => {
      if (input_commnet !== "") {
        let newComment = { ...activeBlog };
        let comntObj = {
          text: input_commnet,
          userName:user.details.username,
        };
        newComment.comment.push(comntObj);
        setActiveBlog(newComment);
        setInputComment("");
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        // Handle Enter key event here
        postComment();
      }
    };

    const addLike = () => {
      let activeBlogCopy = { ...activeBlog };
      activeBlogCopy.Like.push(user.details.email);
      setActiveBlog(activeBlogCopy);
       
    };

    const removeLike = () => {
      let activeBlogCopy = { ...activeBlog };
      activeBlogCopy.Like = activeBlogCopy.Like.filter((key) => user.details.email != key);
      setActiveBlog(activeBlogCopy);
      
      // let index = Blogs.indexOf(activeBlogCopy);
      // setActiveBlog(activeBlogCopy);
      // let BlogarrayCopy = [...Blogs];
      // // console.log(BlogarrayCopy, 'copy');
      // BlogarrayCopy[index] = activeBlogCopy;

      // setBlogs(BlogarrayCopy);
     
      
    };

    return (
      <div className="blogWindow">
        <AiFillCloseCircle
          className="close"
          onClick={() => {
            setActiveBlog(null);
            setComment(false);
            setActiveBlog(null);
          }}
        />
        <div>
          <div className="image_Like_comment">
            <img src={activeBlog.coverImageLink} alt="" />
            <div className="reactionField">
              {activeBlog.Like.includes(user.details.email) ? (
                <AiFillLike
                  style={{ cursor: "pointer" }}
                  onClick={removeLike}
                />
              ) : (
                <AiOutlineLike
                  style={{ cursor: "pointer" }}
                  onClick={addLike}
                />
              )}
              {comment ? (
                <>
                  <FaCommentDots
                    style={{ cursor: "pointer" }}
                    onClick={() => setComment(false)}
                  />

                  <div className="Comments_section">
                    <AiFillCloseCircle
                      className="close"
                      onClick={() => setComment(false)}
                    />
                    <div className="comments">
                      <h5>Comments</h5>
                      {activeBlog.comment &&
                        activeBlog.comment
                          .slice()
                          .reverse()
                          .map((comment) => (
                            <div>
                              <span>{comment.userName}</span>
                              <p>{comment.text}</p>
                            </div>
                          ))}
                    </div>
                    <div className="InputComment">
                      <input
                        value={input_commnet}
                        placeholder="Leave your Comment"
                        type="text"
                        onChange={handleComment}
                        onKeyDown={handleKeyDown}
                      />
                      <FiSend className="send" onClick={postComment} />
                    </div>
                  </div>
                </>
              ) : (
                <FaRegCommentDots
                  style={{ cursor: "pointer" }}
                  onClick={() => setComment(true)}
                />
              )}
            </div>
          </div>
          <div className="aaboutPost_aboutUser">
            <div className="aboutPost">
              <h6>{activeBlog.tittle}</h6>
              <p>{activeBlog.content}</p>
            </div>
            <div className="aboutUser">
              <img src={activeBlog.userImage} alt="" />
              <p>{activeBlog.userName}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };


   
  const [NewpostDetails,setNewPostDetails]=useState({
    type:"",
    tittle:"",
    content:"", 
    coverImageLink:"",
    userName: user.details.username,
    userId:user.details.userId,
    userImage:"https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
    comment:[],
    Like:[]
  })










  const [PostbtnDisabled,setPostbtnDisabled]=useState(false)
  const PostBlogFunc = () => {
   
    const handleChange=(event)=>{
      const {name,value}=event.target;
      let NewpostDetailsCopy={...NewpostDetails}
      NewpostDetailsCopy[name]=value
      setNewPostDetails(NewpostDetailsCopy)
    }

    const handleSubmit=async(event)=>{
      event.preventDefault()
      setPostbtnDisabled(true)
      const response =await axios.post("http://localhost:5000/createPost",NewpostDetails);
      let BlogsCopy=[...Blogs]
      BlogsCopy.push(NewpostDetails) 
      setBlogs(BlogsCopy)
      await setPostbtnDisabled(false)
      setpostBlog(false)
    }

    return (
      <div className="postBlogPage">
        <AiFillCloseCircle
          className="close"
          onClick={() => {
            setpostBlog(false);
          }}
        />
        <div className="CreatePostWIndow"  >
          <div>
              <label htmlFor="">Blog Type <span>(*optional)</span></label>
              <input onChange={handleChange} name="type" placeholder="Enter Blog Type" type="text" />
          </div>  
          <div>
            <label htmlFor="">Tittle</label>
            <input onChange={handleChange} name="tittle" placeholder="Enter Tittle" type="text" />
          </div>
          <div>
            <label htmlFor="">Content</label>
            <textarea placeholder="Enter the the Blog Content" onChange={handleChange} name="content" id="" cols="30" rows="10"></textarea>
          </div>
          <div>
            <label htmlFor="">Image Link</label>
            <input onChange={handleChange} name="coverImageLink" defaultValue="http://" placeholder="Enter Image Link" type="text"/>
          </div>
          <button disabled={PostbtnDisabled} onClick={handleSubmit} >Post Blog</button>
          </div>
      </div> 
    );
  };
  


  return (
    <div style={activeBlog && { overflowY: "none" }} className="blogPage">
      <img
        src="https://blog.hubspot.com/hs-fs/hubfs/Help_Scout_Blog-2.png?width=900&name=Help_Scout_Blog-2.png"
        alt=""
      />
      <div className="CoverPage">
        <h2>Find You Favourite blogs here</h2>
        <img src={CoverImage} alt="" />
      </div>
      <div className="BlogsTypes">
        {BlogType.map((key) => (
          <button>{key}</button>
        ))}
      </div>
      <button onClick={() => setpostBlog(true)} className="postBlog">
        Post Blog
      </button>
      <div className="Blogs">
        {Blogs.slice().reverse().map((key) => (
          <div className="blog">
              
            <img  onClick={() => setActiveBlog(key)} src={key.coverImageLink} alt="" />
            <div  onClick={() => setActiveBlog(key)} className="TittleSubtittle">
              <h6>{key.tittle}</h6>
              <p>{key.content.substring(0, 70)}....</p>
            </div>
            <div className="aboutUser">
              <img src={key.userImage} alt="" />
              <p>{key.userName}</p>
            </div>
          </div>
        ))}
      </div>

      {activeBlog != null && openBlog()}
      {postBlog &&PostBlogFunc()}
    </div>
  );
};

export default Blog;
