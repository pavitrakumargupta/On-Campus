import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import axios from "../../axios"
const GroupChatModel = ({setActiveWindow,fetchChats}) => {
    const user = useSelector((state) => state);
    const [SearchedUser,setSearchedUser]=useState("")
    const [userList,setUserList]=useState([])
    const [addedUser,setAddedUser]=useState([])
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
    const addUser=(user)=>{
    setAddedUser(prevValue=>[...prevValue,user])
    setSearchedUser("")

    }

    const removeFromGroup=(user)=>{
    let rmoveUser=addedUser.filter(key=>key._id!==user._id)
    setAddedUser(rmoveUser)
    setSearchedUser("")
    }

    const createGroupChat=async()=>{
    try {
        const config = {
        headers: {
            Authorization: `Bearer ${user.details.token}`,
        },
        };
        const { data,status } = await axios.post(
        `/Chat/group`,
        {
            name: groupChatName,
            users: JSON.stringify(addedUser.map((u) => u._id)),
        },
        config
        );
        fetchChats()
        setActiveWindow()
        setAddedUser([])
        setUserList([])
        setGroupChatName("")
    } catch (error) {
        
    }
    }

    return <div className='createGpWindow'>
    <div className='box'>
    <i class="fa-solid fa-square-xmark" onClick={()=>setActiveWindow()}></i>
        <h2>Create Group Chat</h2>
        <input value={groupChatName} onChange={(e)=>setGroupChatName(e.target.value)} autoFocus placeholder='Group Name' type="text" />
        <input value={SearchedUser} onChange={onUserAdd} type="text"  placeholder='Add users to the group eg- john doe' />
        
        {/* <div className='userList'> */}
        {addedUser.length!==0&&<div className='addedUser'>
            {addedUser.reverse()?.map((User)=><div>
            <p>{User.name}</p>
            <i class="fa-solid fa-xmark" onClick={()=>removeFromGroup(User)} ></i>
            </div>)}
        </div>}

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
        
        <button onClick={createGroupChat}>Create Chat</button>
    </div>
    </div>
}


 

export default GroupChatModel