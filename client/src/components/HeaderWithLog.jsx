import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
const HeaderWithLog = ({updateState}) => {
  const navigate=useNavigate();
  const [barVisible, setBarVisible] = useState(false);
  const [logOut, setLogOut] = useState(false);
  const onMouse = () => {
    setBarVisible(true);
  };
  const mouseLeave = () => {
    setBarVisible(false);
  };

  const clickLogOut = () => {
    setLogOut(true);
  };

  const closeTag=()=>{
    setLogOut(false)
  }



  const truelyLogOut=()=>{
    fetch("/api/v1/logIn/logOut")
    setLogOut(false)
    setBarVisible(false)
    updateState(false)
    navigate("/")
  }

  return (
    <div>
      <div className="flex items-center justify-between p-4">
        <Link
          to="/"
          className="text-green-900 text-4xl font-bold cursor-pointer"
        >
          Shoe Shop
        </Link>

        <div
          onMouseEnter={onMouse}
          onMouseLeave={mouseLeave}
          className="relative group cursor-pointe"
        >
          <div className="p-10">
            <div>User</div>
            {barVisible && (
              <div className="absolute right-1 mt-2 bg-white border border-gray-300 px-4 w-36 rounded-lg shadow-lg">
                <ul>
                  <li className="hover:bg-gray-200 px-2 py-1 rounded">
                    <button onClick={clickLogOut}>Log out</button>
                    <Modal isOpen={logOut}  className="bg-green-800">
                      <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center ">
                        <div className="fixed bg-gray-200 px-6 py-20 rounded">
                          <button onClick={closeTag} className="absolute right-0 top-0 w-4 ">x</button>
                          <p className="text-lg font-bold mb-4">
                          Do you want to log out?
                          </p>
                          <button onClick={truelyLogOut} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Log out
                          </button>
                        </div>
                      </div>
                    </Modal>
                  </li>
                  <li className="hover:bg-gray-200 px-2 py-1 rounded">
                    <Link to="/cart">Cart</Link>
                  </li >
                  <li className="hover:bg-gray-200 px-2 rounded">
                    <button className="">
                      Delete Account
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderWithLog;
