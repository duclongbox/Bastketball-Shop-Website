import React, { useEffect, useState } from "react";
import LeftColumn from "../utility/LeftColumn";
import { Link } from "react-router-dom";
const Profile = ({updateState}) => {
    const [userInfo, setUserInfo] = useState([]);
    useEffect(() => {
        // fetch the data from db
        const fetchData = async () => {
          try {
            let apiData;
            const response = await fetch("/api/v1/logIn/token");
            apiData = await response.json();
            setUserInfo(apiData.userInfo)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);
  return (
    <div>
      <div className="border-t border-gray-300 w-full"></div>
    <div className="h-screen flex">
      <div className="bg-gray-50">
        <LeftColumn
          userName={userInfo.userID}
          updateState={updateState}
        ></LeftColumn>
        
      </div>
        <div className="ml-40 w-2/3 m-10">
        <div className="flex items-center justify-between">
        <p className="font-bold text-xl">Profile</p>     
        <Link to="/profile/edit" className="ml-auto px-3 py-0.5 outline text-white   bg-gray-700 hover:bg-black ">Edit</Link>
        </div>
        <div className="border-t border-gray-300 w-full m-3"></div>
        <div className="p-3 my-8 flex items-center justify-between">
            <div>
            <p className="font-bold">Name</p>
            {userInfo.name?userInfo.name:<>Not Set</>}
            </div>
            <div>
            <p className="font-bold">Shoe Size</p>
            {userInfo.shoeSize?userInfo.shoeSize:<>Not Set</>}
            </div>
            <div>
            <p className="font-bold">Email Address</p>
            {userInfo.email?userInfo.email:<>Not Set</>}
            </div>
        </div>
            <Link to="/" className="outline px-3 py-2 text-white  bg-gray-700 hover:bg-black">Reset Password</Link>
        
        </div>
    </div>
    </div>
  )
}

export default Profile
