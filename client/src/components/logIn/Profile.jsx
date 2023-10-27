import React, { useEffect, useState } from "react";
import LeftColumn from "../utility/LeftColumn";
import { Link } from "react-router-dom";
import Modal from "react-modal";
const Profile = ({updateState}) => {
    const [userInfo, setUserInfo] = useState([]);
    const [openModal,setOpenModal]=useState(false);
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
      const deleteAccount=()=>{
        setOpenModal(true)
      }
      const closeModal=()=>{
        setOpenModal(false)
      }
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
            <div>
            <p className="font-bold">UserID</p>
            {userInfo.userID?userInfo.userID:<>Not Set</>}
            </div>
        </div>
        <div className="flex justify-between">
            <Link to="/" className="outline px-3 py-2 text-white  bg-gray-700 hover:bg-black">Reset Password</Link>
            <button onClick={deleteAccount} className="outline px-3 py-2 text-white  bg-gray-700 hover:bg-black ">Delete Account</button>
            </div>
            <Modal isOpen={openModal} className="bg-green-300">
                <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center ">
                  <div className="fixed bg-gray-200 px-6 py-20 rounded">
                    <p className="font-semibold">Delete Account: {userInfo.userID}</p>
                    <button onClick={closeModal} className="font-bold absolute right-0 top-0 w-4 m-2">x</button>
                    <div className="border-t border-gray-300 w-full"></div>
                    <div className="m-3 p-5 rounded bg-blue-200">Unexpected bad things will happen if you don’t read this!</div>
                  </div>
                  
                </div>
            </Modal>
        </div>
    </div>
    </div>
  )
}

export default Profile
