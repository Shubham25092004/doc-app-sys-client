import React, { useEffect } from "react";
import { getLoggedUser } from "../api/userAPI";
import { useState } from "react";

const Profile = () => {

  const[user,setUser] = useState()
 async function featchData(){
   const res =await getLoggedUser()
    if(res.data.success){
      setUser(res.data.user)
    }
  }

  useEffect(()=>{
    featchData()
  },[])

  return (
    <>
    <h1>User Profile</h1>
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="p-4">
            <h3>{user?.name}</h3>
            <p>{user?.email}</p>

          </div>

        </div>
        <div className="col">
          <img src={user?.imagePath} alt={user?.name} 
          style={{ width: "350px", height: "350px",  }}/>

        </div>

      </div>
      
     
    </div>
    </>
  );
};

export default Profile;
