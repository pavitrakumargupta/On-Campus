import React, { useEffect, useState } from 'react'
import "./userSidebar.css"
import Skeleton from 'react-loading-skeleton'

import axios from "../../../axios"
import { useSelector } from "react-redux";
const UserSidebar = ({UserSidebar,setSelectedChat}) => {

  const [search ,setSearch]=useState("")
  const [users,setUsers]=useState()
  const [loading,setloading]=useState(false)
  const user = useSelector((state) => state);
  const handleSearch=(e)=>{
    setSearch(e.target.value)
  }


  useEffect(()=>{setloading(false)},users)

  const handleSearchUser=async()=>{
    setloading(true)
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.details.token}`,
        },
      };
  
      const resp = await axios.get(`/User/allUser?search=${search}`, config);
      setUsers(resp.data)
      resp?.status===200&&(setloading(false))
    } catch (error) {
      error.response.status==401&&(window.location.href = "/login")
    }
   
  }

  const accessChat=(userId)=>{
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.details.token}`,
        },
      };
      const fetchChats=async()=>{
        const {data}=await axios.post("/Chat",{userId:userId},config)
        setSelectedChat(data)
        UserSidebar()
      }
      fetchChats()
    } catch (error) {
      error.response.status==401&&(window.location.href = "/login")
    }
  }

  return (
    <div className='userSeachbarPannel'  >
      <div className='userSeachbar' >
         <h6>Search Users</h6>
         <div className='searchWrapper'>
            <input onChange={handleSearch}   autoFocus placeholder='Search by name or email' type="text" />
            <button disabled={!search} onClick={handleSearchUser}><i class="fa-solid fa-magnifying-glass"></i></button>
         </div>
         <span className='result'>{users&&(users.length)}  results :</span>
         {loading&&<Skeleton className='skeleton'  count={20}/> }
         {users&&<div className='users'>
            {users.map(User=>(
              <button className='chatWrap' onClick={()=>accessChat(User._id)}>
                <img src={User.profilePitchure} alt="" />
                <div>
                  <p>{User.name}</p>
                  <span><b>Email :</b>{User.email}</span>
                </div>             
            </button>
            ))}
          </div>}
      </div>
      <div style={{flex:"0.73 1"}} onClick={()=>UserSidebar()} ></div>
    </div>
  )
}

export default UserSidebar