import React from 'react';
import './Dashboard.css';
import chatImg from "../../logos/chat.png"
import blogsImg from "../../logos/blogs.png"
import newsImg from "../../logos/news.png"
import notesImg from "../../logos/notes.png"
import askAnythingImg from "../../logos/askAnything.png"
import pollsImg from "../../logos/polls.png"
import makeFriendImg from "../../logos/makeFriend.png"
import comunityImg from "../../logos/comunity.png"
import { ToastContainer, toast } from "react-toastify";



const Grid = () => {
  const gridItems = [
    { name: "Your Messages", 
      image:chatImg,
      path:"message"
    },
    { name: "Get Notes", 
      image:notesImg,
      path:"notes"
    },
    
    { name: "Polls", 
      image:pollsImg,
      path:"polls"
    },
    { name: "Ask Anything", 
      image:askAnythingImg,
      path:"faq"
    },
    { name: "Make Friends", 
      image:makeFriendImg,
      path:"friends"
    },
    { name: "Blogs", 
      image:blogsImg,
      path:"blogs"
    },
    
    { name: "News & Updates", 
      image:newsImg,
      path:"news"
    },
    { name: "Join the Comunity", 
      image:comunityImg,
      path:"comunity"
    }
    ];
    const toast_style = {
      position: "bottom-right",
      autoClose: 4000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      width: "10rem",
    };
    
    const navigatePath=(navigate)=>{
      if(navigate=="comunity" || navigate=="friends"){
        toast.success("this Feature will be Coming soon",toast_style)
        console.log(navigate);
      }else{
        window.location.href = `/${navigate}`;
      }
     
    }
    
  
  return (
    <div className='main'>
   <div className="grid">
      {gridItems.map((item,index) => (
        <div
          key={item.id}
          className="grid-item"
        >
          <div onClick={()=>navigatePath(item.path)}>
            <p>{item.name}</p>
            <img src={item.image} alt="" />
          </div> 
        </div>
      ))}
    </div>
    <ToastContainer/>
    </div>
  );
};

export default Grid;
