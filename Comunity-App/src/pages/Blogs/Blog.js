import React, { useState, useEffect, useRef } from "react";
import "./Blog.css";
import CoverImage from "./img/coverImage.gif";
import { AiFillLike, AiOutlineLike, AiFillCloseCircle } from "react-icons/ai";
import { FaRegCommentDots, FaCommentDots } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
const Blog = () => {
  const BlogType = [
    "All",  
    "Coding",
    "Education",
    "Financial",
    "Sports",
    "Other",
  ];
  const email = "programmer0231@gmail.com";
  const Blogs_arry = [
    {
      coverImage:
        "https://thumbs.dreamstime.com/b/cristiano-ronaldo-portuguese-professional-footballer-who-plays-manchester-united-portugal-national-team-illustration-260710817.jpg",
      Tittle: "Cristiano Retires",
      subTittle:
        "s Cristiano Ronaldo marks his 38th birthday, it's safe to say things are looking rather different for the veteran compared to this time last year. Twelve months ago, Ronaldo was gearing up for Man Utd's trip to Burnley, having missed a penalty one day earlier as United were stunned by Middlesbrough in the FA Cup. He didn't score that day, but did deliver two hat-tricks between then and the end of the season while finishing as top scorer for his club.Fast forward to February 2023 and not only is Ronaldo no longer at Old Trafford, but he's no longer in Europe. The Portugal international has endured a tough start to life at new club Al-Nassr, and faces some big decisions in the twilight of his career.",
      userName: "Andreew python",
      userImage:
        "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
      comment: [
        {
          text: "helloaaaaaaaaaaaaaa",
          userName: "Andrew Philips",
        },
        {
          text: "hello",
          userName: "Andrew Philips",
        },
        {
          text: "hello",
          userName: "Andrew Philips",
        },
        {
          text: "hello",
          userName: "Andrew Philips",
        },
        {
          text: "hello",
          userName: "Andrew Philips",
        },
        {
          text: "hello",
          userName: "Andrew Philips",
        },
        {
          text: "hello",
          userName: "Andrew Philips",
        },
        {
          text: "hello",
          userName: "Andrew Philips",
        },
        {
          text: "hello",
          userName: "Andrew Philips",
        },
      ],
      like: [],
    },
    {
      coverImage: "https://cdn.wallpapersafari.com/52/87/VXtPrc.jpg",
      Tittle: "Virat to beat Sachin",
      subTittle:
        "Virat is making good scores in this year so from some poles athere are expectation and he will beat the sachin record soon and become the no1 ODI and test player",
      userName: "kilo sharma",
      userImage:
        "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
      comment: [
        {
          text: "hello",
          userName: "Andrew Philips",
        },
        {
          text: "hello",
          userName: "Andrew Philips",
        },
        {
          text: "hello",
          userName: "Andrew Philips",
        },
      ],
      like: [],
    },
    {
      coverImage:
        "https://thumbs.dreamstime.com/b/cristiano-ronaldo-portuguese-professional-footballer-who-plays-manchester-united-portugal-national-team-illustration-260710817.jpg",
      Tittle: "Cristiano Retires",
      subTittle:
        "Cristiano Ronaldo may not retire this year and the expenctations are he may play the game against Barcilona club next year",
      userName: "Andreew python",
      userImage:
        "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
      comment: [
        {
          text: "hello",
          userName: "Andrew Philips",
        },
        {
          text: "hello",
          userName: "Andrew Philips",
        },
        {
          text: "hello",
          userName: "Andrew Philips",
        },
      ],
      like: [],
    },
    {
      coverImage: "https://cdn.wallpapersafari.com/52/87/VXtPrc.jpg",
      Tittle: "Virat to beat Sachin",
      subTittle:
        "Virat is making good scores in this year so from some poles athere are expectation and he will beat the sachin record soon and become the no1 ODI and test player",
      userName: "kilo sharma",
      userImage:
        "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
      comment: [
        {
          text: "hello",
          userName: "Andrew Philips",
        },
        {
          text: "hello",
          userName: "Andrew Philips",
        },
        {
          text: "hello",
          userName: "Andrew Philips",
        },
      ],
      like: [],
    },
    {
      coverImage:
        "https://thumbs.dreamstime.com/b/cristiano-ronaldo-portuguese-professional-footballer-who-plays-manchester-united-portugal-national-team-illustration-260710817.jpg",
      Tittle: "Cristiano Retires",
      subTittle:
        "Cristiano Ronaldo may not retire this year and the expenctations are he may play the game against Barcilona club next year",
      userName: "Andreew python",
      userImage:
        "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
      comment: [
        {
          text: "hello",
          userName: "Andrew Philips",
        },
        {
          text: "hello",
          userName: "Andrew Philips",
        },
        {
          text: "hello",
          userName: "Andrew Philips",
        },
      ],
      like: [],
    },
    {
      coverImage: "https://cdn.wallpapersafari.com/52/87/VXtPrc.jpg",
      Tittle: "Virat to beat Sachin",
      subTittle:
        "Virat is making good scores in this year so from some poles athere are expectation and he will beat the sachin record soon and become the no1 ODI and test player",
      userName: "kilo sharma",
      userImage:
        "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
      comment: [
        {
          text: "hello",
          userName: "Andrew Philips",
        },
        {
          text: "hello",
          userName: "Andrew Philips",
        },
        {
          text: "hello",
          userName: "Andrew Philips",
        },
      ],
      like: [],
    },
    {
      coverImage:
        "https://thumbs.dreamstime.com/b/cristiano-ronaldo-portuguese-professional-footballer-who-plays-manchester-united-portugal-national-team-illustration-260710817.jpg",
      Tittle: "Cristiano Retires",
      subTittle:
        "Cristiano Ronaldo may not retire this year and the expenctations are he may play the game against Barcilona club next year",
      userName: "Andreew python",
      userImage:
        "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
      comment: [
        {
          text: "hello",
          userName: "Andrew Philips",
        },
        {
          text: "hello",
          userName: "Andrew Philips",
        },
        {
          text: "hello",
          userName: "Andrew Philips",
        },
      ],
      like: [],
    },
    {
      coverImage: "https://cdn.wallpapersafari.com/52/87/VXtPrc.jpg",
      Tittle: "Virat to beat Sachin",
      subTittle:
        "Virat is making good scores in this year so from some poles athere are expectation and he will beat the sachin record soon and become the no1 ODI and test player",
      userName: "kilo sharma",
      userImage:
        "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
      comment: [
        {
          text: "hello",
          userName: "Andrew Philips",
        },
        {
          text: "hello",
          userName: "Andrew Philips",
        },
        {
          text: "hello",
          userName: "Andrew Philips",
        },
      ],
      like: [],
    },
  ];
  const [Blogs, setBlogs] = useState(Blogs_arry);

  const [activeBlog, setActiveBlog] = useState(null);
  const [comment, setComment] = useState(false);
  const [input_commnet, setInputComment] = useState("");

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
          userName: "Andrew palo",
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

    const handleLike = () => {
      let addLike = { ...activeBlog };
      addLike.like.push(email);
      setActiveBlog(addLike);
    };
    const removeLike = () => {
      let addLike = { ...activeBlog };
      let index = Blogs.indexOf(addLike);
      addLike.like = addLike.like.filter((key) => email != key);
      setActiveBlog(addLike);
      let BlogarrayCopy = [...Blogs];
      BlogarrayCopy[index] = addLike;

      setBlogs(BlogarrayCopy);
      console.log(BlogarrayCopy[index].like, Blogs[index] && Blogs[index].like);
    };

    return (
      <div className="blogWindow">
        <AiFillCloseCircle
          className="close"
          onClick={() => {
            setActiveBlog(null);
            setComment(false);
            setActiveBlog(null)
          }}
        />
        <div>
          <div className="image_Like_comment">
            <img src={activeBlog.coverImage} alt="" />
            <div className="reactionField">
              {activeBlog.like.includes(email) ? (
                <AiFillLike
                  style={{ cursor: "pointer" }}
                  onClick={removeLike}
                />
              ) : (
                <AiOutlineLike
                  style={{ cursor: "pointer" }}
                  onClick={handleLike}
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
              <h6>{activeBlog.Tittle}</h6>
              <p>{activeBlog.subTittle}</p>
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

  return (
    <div style={activeBlog&&{overflowY:"none"}} className="blogPage">
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
      <div className="Blogs">
        {Blogs.map((key) => (
          <div onClick={() => setActiveBlog(key)} className="blog">
            <img src={key.coverImage} alt="" />
            <div className="TittleSubtittle">
              <h6>{key.Tittle}</h6>
              <p>{key.subTittle.substring(0, 50)}....</p>
            </div>
            <div className="aboutUser">
              <img src={key.userImage} alt="" />
              <p>{key.userName}</p>
            </div>
          </div>
        ))}
      </div>
      
      {activeBlog != null && openBlog()}
    </div>
  );
};

export default Blog;
