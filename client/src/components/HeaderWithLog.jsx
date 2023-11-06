import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SearchBar from "./utility/SearchBar";
import HandelLogOut from "./utility/HandelLogOut";
const HeaderWithLog = ({updateState},{getSearchState,handleChange}) => {
  const navigate=useNavigate();
  const [barVisible, setBarVisible] = useState(false);
  const [openModal,setOpenModal]=useState(false)
  const [logOut, setLogOut] = useState(false);
  const onMouse = () => {
    setBarVisible(true);
  };
  const mouseLeave = () => {
    setBarVisible(false);
  };

  const clickLogOut = () => {
    setOpenModal(true)
  };

  const msetLogOut= (newState) => {
    setLogOut(true)
  }

  const trulyLogOut=()=>{
    setBarVisible(false)
    updateState()
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
        <SearchBar handleChange={handleChange} />
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
                    {openModal && <HandelLogOut setLogOut={msetLogOut} />}
                    {logOut&&trulyLogOut()}
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
