import React from 'react'
import "./sidebar.css"
const sidebar = () => {
    const profile="https://imgs.search.brave.com/iUQN726wdtZCy0T-0h75qU-Z2G_pncG6DygWzLUzkNU/rs:fit:600:600:1/g:ce/aHR0cHM6Ly96dWx0/aW1hdGUuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE5LzEy/L2RlZmF1bHQtcHJv/ZmlsZS5wbmc"
    const users=[
        {
            img:profile,
            name:"Pavitra Kumar Gupta",
            lastMessage:"kase ho",
            lastMessageDate:"yesterday"
        },{
            img:profile,
            name:"Pavitra Kumar Gupta",
            lastMessage:"kase ho",
            lastMessageDate:"yesterday"
        },{
            img:profile,
            name:"Pavitra Kumar Gupta",
            lastMessage:"kase ho",
            lastMessageDate:"yesterday"
        },{
            img:profile,
            name:"Pavitra Kumar Gupta",
            lastMessage:"kase ho",
            lastMessageDate:"yesterday"
        },{
            img:profile,
            name:"Pavitra Kumar Gupta",
            lastMessage:"kase ho",
            lastMessageDate:"yesterday"
        },{
            img:profile,
            name:"Pavitra Kumar Gupta",
            lastMessage:"kase ho",
            lastMessageDate:"yesterday"
        },{
            img:profile,
            name:"Pavitra Kumar Gupta",
            lastMessage:"kase ho",
            lastMessageDate:"yesterday"
        },{
            img:profile,
            name:"Pavitra Kumar Gupta",
            lastMessage:"kase ho",
            lastMessageDate:"yesterday"
        },{
            img:profile,
            name:"Pavitra Kumar Gupta",
            lastMessage:"kase ho",
            lastMessageDate:"yesterday"
        },{
            img:profile,
            name:"Pavitra Kumar Gupta",
            lastMessage:"kase ho",
            lastMessageDate:"yesterday"
        },
    ]
  return (
    <div className='sidebar'>
        <input type="search" />
        <div className='userList'>
            <h4>Message</h4>
            <div className='users'>
                {users.map((key,index)=>(
                    <div className='user'>
                        <img src={key.img} alt="" srcset="" />
                        <div>
                            <h6>{key.name}</h6>
                            <p>{key.lastMessage}</p>
                        </div>
                        <p>{key.lastMessageDate}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default sidebar