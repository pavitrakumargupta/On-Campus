import React, { useState, useEffect, useRef } from "react";
import "./Blog.css";
import CoverImage from "./img/coverImage.gif";
import { AiFillLike, AiOutlineLike, AiFillCloseCircle } from "react-icons/ai";
import { FaRegCommentDots, FaCommentDots } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import axios from "axios";
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


  useEffect(() => {
    const fetchBlogsData = async () => {
      const response = await axios.get("http://localhost:5000/getAllPost");
      setBlogs(response.data);
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
      activeBlogCopy.Like.push(user.details.email);
      setActiveBlog(activeBlogCopy);
    };

    const removeLike = () => {
      let activeBlogCopy = { ...activeBlog };
      activeBlogCopy.Like = activeBlogCopy.Like.filter(
        (key) => user.details.email != key
      );
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


  const [postBlogWindow, setPostBlogWindow] = useState(true);
  const handleSubmitBlog = (BlogDetail) => {
    const response = axios.post("http://localhost:5000/createPost", BlogDetail);
    let BlogsCopy = [...Blogs];
    BlogsCopy.push(BlogDetail);
    setBlogs(BlogsCopy);
    setPostBlogWindow(false);
  };
  const handleBlogWindow = () => {
    setPostBlogWindow(false);
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
        onClick={() => setPostBlogWindow(true)}
        className="postBlogWindowBtn"
      >
        Post Blog
      </button>
      <div className="Blogs">
        {Blogs.slice()
          .reverse()
          .map((key) => (
            <div className="blog">
              {/* <button onClick={editPost}>Edit</button>
            <button>Delete</button> */}
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
        />
      )}
    </div>
  );
};

export default Blog;
