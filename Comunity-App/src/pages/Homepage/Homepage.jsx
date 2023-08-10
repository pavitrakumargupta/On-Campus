import React, { useEffect, useState } from "react";
import Navbar from "../HomepageCompo/navbar/navbar";
import "./Homepage.css";
import Services from "../HomepageCompo/services/services";
import heroSectionVideo from "./assets/course-video.mp4";
import logo from "../../logos/logo.png";
// import MessageImg from "./assets/messageCard.png"
// import BlogsImg from "./assets/blogsCard.png"
// import NotesImg from "./assets/notesCard.png"
// import NewsImg from "./assets/newsCard.png"
// import PollsImg from "./assets/pollsCard.png"
// import FaqImg from "./assets/faqCard.png"
// import JoinComunityImg from "./assets/joinComunity.png"
// import MakeFriendsImg from "./assets/makeFriendsCard.png"
import DashboardImg from "./assets/dashboard.png"
import axios from "../../axios"
import {ToastContainer,toast} from "react-toastify"

const Homepage = () => {
  // const [showCardDetails, setShowCardDetails] = useState(false);
  const toast_style={
    position:"bottom-right", 
    autoClose:4000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark",
  }
 
  const services = [
    {
      title: "Message",
      description: "Welcome to this dynamic platform, where communication knows no bounds. Message anyone instantly, form group chats effortlessly, and read messages at your convenience. With time and distance no longer hurdles, you're in control of connections and conversations like never before.",
      image:  "fa-brands fa-rocketchat", // Replace with the image URL
    },
    {
      title: "Blogs",
      description: "In this space, you have the opportunity to explore a variety of blogs, appreciating content that resonates with you through likes and engaging in discussions via comments. Moreover, you can also express yourself fully by crafting your own blog, sharing your unique perspectives and insights with the community. It's a platform where interaction, appreciation, and creativity converge to create a rich tapestry of online expression.",
      image:  "fa-solid fa-blog" , // Replace with the image URL
    }, 
    {
      title: "Notes",
      description: "Effortlessly take and organize your notes within this platform, ensuring that your thoughts are captured and easily accessible. Additionally, you can elevate your note-taking experience by uploading various types of content, such as documents, images, and more. This feature empowers you to compile a comprehensive digital repository, seamlessly blending your personal insights with external resources to create a unified knowledge hub",
      image: "fa-regular fa-note-sticky"  // Replace with the image URL
    },
    {
      title: "News & Update",
      description: "Stay informed and up-to-date with the latest news and developments through our dedicated section. Here, you can access a curated stream of news articles and updates from various sources, ensuring you're always in the loop. Whether it's local or global news, trends, or significant events, this feature keeps you connected to the rapidly changing world around you.",
      image:  "fa-solid fa-newspaper" , // Replace with the image URL
    },
    {
      title: "Faq",
      description: "Explore our Frequently Asked Questions (FAQ) section to find quick answers to common queries. This resource is designed to provide you with clear and concise explanations on various topics, ensuring that you can easily navigate through any uncertainties. From using the platform's features to understanding its functionalities, our FAQ section is here to offer the clarity you need, right at your fingertips.",
      image: "fa-solid fa-clipboard-question" // Replace with the image URL
    },
    {
      title: "Polls",
      description: "Engage with others and gather opinions through interactive polls. With our polls feature, you can create questions on various subjects and invite others to participate by casting their votes. This enables you to quickly gauge the preferences, thoughts, and sentiments of your audience, making it a valuable tool for decision-making, brainstorming, or simply having fun interactions.",
      image: "fa-solid fa-square-poll-horizontal" , // Replace with the image URL
    },
    // Add more services here
  ];
  const commingSoon = [
    {
      title: "Join Comunity",
      description: "Become a part of our vibrant community by joining today. As a member, you'll connect with like-minded individuals who share your interests, passions, and goals. Engage in discussions, share insights, and collaborate on projects within a supportive and inclusive environment. Together, we create a space where ideas flourish, connections thrive, and collective growth is nurtured.",
      image: "fa-solid fa-group-arrows-rotate", // Replace with the image URL
    },
    {
      title: "Make Friends",
      description: "Forge meaningful connections and make new friends within our welcoming community. Discover individuals who resonate with your values and interests, sparking conversations that lead to lasting relationships. Whether you're looking for companionship, shared hobbies, or simply expanding your social circle, our platform provides the perfect avenue to connect with people from all walks of life.",
      image: "fa-solid fa-user-group", // Replace with the image URL
    }]
 

  useEffect(() => {
    // Add smooth scroll behavior for navigation links
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const targetSection = document.querySelector(link.getAttribute("href"));
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }, []);

  const contactInit={
    email:"",
    name:"",
    message:""
  }

  const [contactDetails,setContactDetails]=useState(contactInit)

  const onChangeContact=(e)=>{
    const {name ,value}=e.target
    setContactDetails(prevValue=>({...prevValue,[name]:value}))
  }

  const OnSubmit=async ()=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(contactDetails.email)){
      toast.error("Enter a valid email",toast_style)
    }else{
    try {
      const {data}=await axios.post("/ContactUs",contactDetails)
      setContactDetails(contactInit) 
      toast.success(data,toast_style) 
    } catch (error) {
      toast.error(error.response.data,toast_style)
    }
  }
    
  }
  
  const [navRespActive,setNavRespActive]=useState(false)
  const setNavresp=()=>{
    setNavRespActive(!navRespActive)
  }
  return (
    <div className="HomePage">
      <header className={`navbar ${navRespActive&&"navResp"}`}>
        <img src={logo} alt="" />
        <div className="navWrapper">
          <nav>
            <ul>
              <li>
                <a href="#hero-section">Home</a>
              </li>
              <li>
                <a href="#about-section">About</a>
              </li>
              <li>
                <a href="#services-section">Services</a>
              </li>
              <li>
                <a href="#contact-section">Contact Us</a>
              </li>
            </ul>
          </nav>
          <div className="auth-buttons">
            <button onClick={()=>{window.location.href = "/login"}}>Login</button>
            <button onClick={()=>{window.location.href = "/register"}}>Signup</button>
          </div>
        </div>
        <div className="bars"onClick={setNavresp} >
          {!navRespActive?<i class="fa-solid fa-bars"></i>:<i class="fa-solid fa-circle-xmark"></i>}
        </div>
      </header>

      <div id="hero-section" className="hero-section">
        <video id="bg-video" autoPlay loop muted>
          <source src={heroSectionVideo} type="video/mp4" />
          <source src={heroSectionVideo} type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <h1>Welcome to On-Campus</h1>
        <p>Your one-stop platform for all things campus-related.</p>
      </div>
      <div id="about-section" >
      <h2>About Us</h2>
      <div className="about-section" >
      <img
          src="https://rmwarnerlaw.com/wp-content/uploads/2020/05/shutterstock_260681906-scaled-900x350.jpg"
          alt="Pavitra Kumar Gupta"
          className="profile-image"
        />
        <div className="about-details">
        
          <p className="role">Full Stack Developer</p>
          <p>
            <p className="description">
              I'm a dedicated Full Stack Developer based in New Delhi, India.
              With a strong passion for crafting innovative solutions, I
              specialize in creating scalable applications that prioritize
              user-centric experiences.
            </p>
          </p>
          <div className="contact-details">
            <p>
              <strong>Address:</strong> New Delhi, India
            </p>
            <p>
              <strong>Email:</strong> pavitragupta021@gmail.com
            </p>
            <div className="social-links">
              <a
                href="https://github.com/pavitrakumargupta"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/pavitra-kumar-gupta/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div id="services-section" className="services">
      <h2>Our Services</h2>
      <img src={DashboardImg} alt="" />
        <div className="card-container">
          {services.map((service, index) => (
            <div
              className={`card `}
              key={index}  
            >
              <h2>{service.title}</h2>
              <div className={  "description" }>
                <div>
                <i class={service.image}></i>
                 <p><b>{service.title}</b></p>
                </div>
                <p >{service.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="coming-soon-container">
          <h2 style={{textAlign:"center"}}>Coming Soon</h2>
          <p>Exciting things are in the works! Stay tuned for updates.</p>
          <div className="card-container">
            {commingSoon.map((service, index) => (
              <div
                className={`card`}
              >
                <h2>{service.title}</h2>
                <div className={  "description" }>
                  <div>
                  <i class={service.image}></i>
                  <p><b>{service.title}</b></p>
                  </div>
                  
                  <p >{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="contact-section" className="contact-section">
        <h2>Contact Us</h2>
        <input onChange={onChangeContact} name="name" value={contactDetails.name} type="name" placeholder="Enter your Name" />
        <input onChange={onChangeContact} name="email" value={contactDetails.email} type="email" required placeholder="Enter your email" />
        <textarea required onChange={onChangeContact} value={contactDetails.message} name="message" placeholder="Enter your message" />
        <button onClick={OnSubmit}>Submit</button>
      </div>
      <footer className="footer">
        <p>On Campus &copy; {new Date().getFullYear()}. All rights reserved.</p>
      </footer>
      <ToastContainer />
    </div>
  );
};

export default Homepage;
