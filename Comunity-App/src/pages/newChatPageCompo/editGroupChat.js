import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import axios from "../../axios"
const EditGroupChatModel = ({setActiveWindow,selectedChat,setSelectedChat,toggleModiefiedChat}) => {
    const user = useSelector((state) => state);
    const [SearchedUser,setSearchedUser]=useState("")
    const [userList,setUserList]=useState([])
    const [addedUser,setAddedUser]=useState(selectedChat.users)
    const [groupChatName,setGroupChatName]=useState("")

    useEffect(()=>{
    const fetchUserbyname=async()=>{
        try {
        const config = {
            headers: {
            Authorization: `Bearer ${user.details.token}`,
            },
        };
    
        const { data } = await axios.get(`/User/allUser?search=${SearchedUser}`, config);
        let finaldata=data.filter((key)=>{
            let notIncludeUser=addedUser.find(user=>user._id===key._id)
            if(!notIncludeUser){
            return key
            }
        })
        setUserList(finaldata)
        } catch (error) {
        
        }
    }
    SearchedUser!==""?fetchUserbyname():setUserList([])
    
    },[SearchedUser])

    const onUserAdd=(e)=>{
    setSearchedUser(e.target.value)
    }
    const addUser=async(User)=>{
        if(selectedChat.groupAdmin._id===user.details._id){
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.details.token}`,
                    },
                };
                const { data } = await axios.put(
                `/Chat/groupAdd`,
                {
                    chatId: selectedChat._id,
                    userId: User._id,
                },
                config
                );
                setAddedUser(data.users)
                setSearchedUser("") 
                setSelectedChat(data) 
                toggleModiefiedChat()  
            } catch (error) {
                console.log(error);
            }
        }
        }
        

    const removeFromGroup=async(User)=>{
        if(selectedChat.groupAdmin._id===user.details._id){
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.details.token}`,
                    },
                };
                const { data } = await axios.put(
                `/Chat/groupRemove`,
                {
                    chatId: selectedChat._id,
                    userId: User._id,
                },
                config
                );
                setAddedUser(data.users)
                setSearchedUser("")
                setSelectedChat(data)   
                console.log("helloo");
                toggleModiefiedChat()
            } catch (error) {
                
            }
        }
    }

    const leaveGroup=async(User)=>{
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.details.token}`,
                },
            };
            const { data } = await axios.put(
            `/Chat/groupRemove`,
            {
                chatId: selectedChat._id,
                userId: User._id,
            },
            config
            );
            setAddedUser(data.users)
            setSearchedUser("")
            setSelectedChat() 
            toggleModiefiedChat()  
        } catch (error) {
            
        }
    }

 

    const updateGpName=async()=>{
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.details.token}`,
                },
                };
            const { data } = await axios.put(
            `/Chat/rename`,
            {
                chatId: selectedChat._id,
                chatName: groupChatName,
            },
            config
            );
            setSelectedChat(data)   
            toggleModiefiedChat()  
        } catch (error) {
            
        }
    }

    return <div className='createGpWindow'>
    <div className='box'>
    <i class="fa-solid fa-square-xmark" onClick={()=>setActiveWindow()}></i>
        <h2>{selectedChat.chatName}</h2>
        {addedUser.length!==0&&<div className='addedUser'>
            {addedUser.reverse()?.map((User)=><div>
            <p>{User.name}</p>
            <i class="fa-solid fa-xmark" onClick={()=>removeFromGroup(User)} ></i>
            </div>)}
        </div>}
        <div className='updateGpname'>
            <input value={groupChatName} onChange={(e)=>setGroupChatName(e.target.value)} autoFocus placeholder='Update Group Name' type="text" />
            <button onClick={updateGpName}>Update</button>
        </div>
        <input value={SearchedUser} onChange={onUserAdd} type="text"  placeholder='Add more users to the group eg- john doe' />
        
        {/* <div className='userList'> */}
        

        {userList.length!==0&&<div className='userList'>
            {userList?.map((User=><button onClick={()=>addUser(User)}>
            <img src={User.profilePitchure} alt="" />
                <div>
                    <p>{User.name}</p>
                    <span><b>Email :</b>{User.email}</span>
                </div> 
            </button>))}
        </div>}
        {/* </div> */}
        
        <button onClick={()=>leaveGroup({_id:user.details._id})}>Leave Group</button>
    </div>
    </div>
}


 

export default EditGroupChatModel