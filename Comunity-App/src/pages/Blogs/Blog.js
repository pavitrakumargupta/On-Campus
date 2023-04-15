import React, { useState, useEffect, useRef } from "react";
import "./Blog.css";
import CoverImage from "./img/coverImage.gif";
import { AiFillLike, AiOutlineLike, AiFillCloseCircle } from "react-icons/ai";
import { FaRegCommentDots, FaCommentDots } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { BiDotsHorizontal } from "react-icons/bi";
import axios from "../../axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import PostBlog from "./PostBlog";

const Blog = () => {
  const location = useLocation();
  const user = useSelector((state) => state);

  const navigate = useNavigate();
  useEffect(() => {
    if (user.details === "unset") {
      localStorage.setItem(
        "lastUrl",
        JSON.stringify({ url: location.pathname })
      );
      navigate("/");
    }
  }, []);

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
  const [postAction,setPostAction]=useState("")

  useEffect(() => {
    const fetchBlogsData = async () => {
      const response = await axios.get("/getAllPost");
      setBlogs(response.data);
      // console.log(response.data[0]._id);
    };
    fetchBlogsData();
  }, []);

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
          userName: user.details.username,
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
      activeBlogCopy.Like.push(user.details.userId);
      setActiveBlog(activeBlogCopy);
    };

    const removeLike = () => {
      let postid= activeBlog._id
      let activeBlogCopy = { ...activeBlog };
      activeBlogCopy.Like = activeBlogCopy.Like.filter(
        (key) => user.details.userId != key
      );
      let BlogsCopy = [...Blogs];
      const deleteLike = BlogsCopy.find(Post => Post._id===postid);
      let index=BlogsCopy.indexOf(deleteLike)
      BlogsCopy[index].Like=activeBlogCopy.Like
      setActiveBlog(activeBlogCopy);
      setBlogs(BlogsCopy);
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
              {activeBlog.Like.includes(user.details.userId) ? (
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
              <p style={{whiteSpace:"pre-wrap"}}>{activeBlog.content}</p>
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

  const [postBlogWindow, setPostBlogWindow] = useState(false);
  const handleSubmitBlog =async (BlogDetail,_id) => {
    if(postAction==="post"){
      const response =await axios.post("/createPost", BlogDetail);
      let BlogsCopy = [...Blogs];
      BlogsCopy.push(BlogDetail);
      setBlogs(BlogsCopy);
    }else{
      let edit_Post=BlogDetail
      edit_Post._id=_id
      console.log(edit_Post);
      const response = axios.post("/editPost", edit_Post);
      let BlogsCopy = [...Blogs];
      const render_edit = BlogsCopy.find(Post => Post._id===_id);
      let index=BlogsCopy.indexOf(render_edit)
      BlogsCopy[index]=edit_Post
      console.log(BlogsCopy[index]);
      setBlogs(BlogsCopy);
    }
    
    setPostBlogWindow(false);
  };
  const handleBlogWindow = () => {
    setPostBlogWindow(false);
  };


 

  const handlePostOption = (name,Blog) => {
    if (name === "edit") {
      setActiveBlog(Blog)
      setPostBlogWindow(true);
      setPostAction(name)
    }else if(name==="delete"){
      const response = axios.post("/deletePost",{_id:Blog._id});
      let BlogsCopy = [...Blogs];
      let index=BlogsCopy.indexOf(Blog)
      BlogsCopy =BlogsCopy.slice(index+1)
      setBlogs(BlogsCopy);
    }
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
      <button
        onClick={() => {setPostBlogWindow(true);setPostAction("post")}}
        className="postBlogWindowBtn"
      >
        Post Blog
      </button>

      <div className="Blogs">
        {Blogs.slice()
          .reverse()
          .map((key,index) => (
            <div className="blog">
              <BiDotsHorizontal className="optionsicon" />
              {
                key.userId==user.details.userId&&<div className="options">
                <p name="edit" onClick={() => handlePostOption("edit",key)}>
                  Edit Post
                </p>
                <p name="delete" onClick={(event) => handlePostOption("delete",key)}>
                  Delete Post
                </p>
              </div>
              }
              
              <img
                onClick={() => setActiveBlog(key)}
                src={key.coverImageLink}
                alt=""
              />
              <div
                onClick={() => setActiveBlog(key)}
                className="TittleSubtittle"
              >
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
      {postBlogWindow && (
        <PostBlog
          user={user}
          handleSubmitBlog={handleSubmitBlog}
          closeWindow={handleBlogWindow}
          BlogDetail={activeBlog}
        />
      )}
    </div>
  );
};

export default Blog;
