import React, { useEffect, useState } from "react";
import LeftColumn from "../utility/LeftColumn";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { AiOutlineWarning } from "react-icons/ai";
const Profile = ({ updateState }) => {
  const navigate=useNavigate()
  const [userInfo, setUserInfo] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [enterMessage,setEnterMessage]=useState('')
  const [isActive,setIsActive]=useState(false)
  useEffect(() => {
    // fetch the data from db
    const fetchData = async () => {
      try {
        let apiData;
        const response = await fetch("/api/v1/logIn/token");
        apiData = await response.json();
        setUserInfo(apiData.userInfo);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const deleteAccount = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setConfirmDelete(false)
    setOpenModal(false);
  };
  const confirmD = () => {
    setConfirmDelete(true);
  };

  const handelInputChange=(e)=>{
    const message = e.target.value;
    if (message) {
      setEnterMessage(message)
    }
  }
  useEffect(() => {
    setIsActive(enterMessage === userInfo.userID);
  }, [enterMessage, userInfo.userID]);

  const sentDeleteMessage=()=>{
    // delete account
    fetch("/api/v1/logIn/deleteAccount",{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    }).then(response => response.json()).then(data=>{if(data.success!==true)console.log("Unsuccessfully to delete")}).catch((error)=>console.log(error))
    updateState()
    navigate("/")
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
            <Link
              to="/profile/edit"
              className="ml-auto px-3 py-0.5 outline text-white   bg-gray-700 hover:bg-black "
            >
              Edit
            </Link>
          </div>
          <div className="border-t border-gray-300 w-full m-3"></div>
          <div className="p-3 my-8 flex items-center justify-between">
            <div>
              <p className="font-bold">Name</p>
              {userInfo.name ? userInfo.name : <>Not Set</>}
            </div>
            <div>
              <p className="font-bold">Shoe Size</p>
              {userInfo.shoeSize ? userInfo.shoeSize : <>Not Set</>}
            </div>
            <div>
              <p className="font-bold">Email Address</p>
              {userInfo.email ? userInfo.email : <>Not Set</>}
            </div>
            <div>
              <p className="font-bold">UserID</p>
              {userInfo.userID ? userInfo.userID : <>Not Set</>}
            </div>
          </div>
          <div className="flex justify-between">
            <Link
              to="/"
              className="outline px-3 py-2 text-white  bg-gray-700 hover:bg-black"
            >
              Reset Password
            </Link>
            <button
              onClick={deleteAccount}
              className="outline px-3 py-2 text-white  bg-gray-700 hover:bg-black "
            >
              Delete Account
            </button>
          </div>
          <Modal isOpen={openModal} className="bg-green-300">
            <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center ">
              <div className="bg-gray-200 rounded mx-auto max-w-lg p-6 fixed">
                <p className="font-semibold">
                  Delete Account: {userInfo.userID}
                </p>
                <button
                  onClick={closeModal}
                  className="font-bold absolute right-0 top-0 w-4 m-2"
                >
                  x
                </button>
                <div className="border-t border-gray-300 w-full"></div>
                {confirmDelete ? (
                  <div>
                    <div className="border-t border-gray-300 w-full"></div>
                    <p className="">To confirm, Please type your "{userInfo.userID}" in the box below</p>
                      <input className="bg-gray-200 rounded ring-1 ring-red-500 my-4 w-full" autoComplete="off" type="text" id="account" name="account" onChange={handelInputChange} />
                      <button className={`bg-gray-800 text-red-500 rounded p-3 hover:bg-black ${!isActive ? 'cursor-not-allowed' : ''}`} disabled={!isActive} onClick={sentDeleteMessage}>Delete Account</button>
                  </div>
                ) : (
                  <div>
                    <div className="flex m-3 p-5 rounded bg-blue-200">
                      <AiOutlineWarning className="m-1" />
                      Unexpected bad things will happen if you don’t read this!
                    </div>
                    <p className="text-gray-700 m-2">
                      This will permanently delete the {userInfo.userID}{" "}
                      account, buying history, following shoes, profile.
                    </p>
                    <div className="border-t border-gray-300 w-full"></div>
                    <button
                      onClick={confirmD}
                      className="rounded outline  py-1 px-3 m-2 mx-8 hover:bg-gray-300"
                    >
                      I have read and understand these effects
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Profile;
