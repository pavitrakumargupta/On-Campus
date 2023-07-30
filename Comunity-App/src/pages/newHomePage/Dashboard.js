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


const navigatePath=(navigate)=>{
  window.location.href = `/${navigate}`;
}


const Grid = () => {
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
    </div>
  );
};

export default Grid;
