import React, { useState } from "react";
import { Link } from "react-router-dom";
const HeaderWithLog = () => {
  const [barVisible, setBarVisible] = useState(false);
  const onMouse = () => {
    setBarVisible(true);
  };
  const mouseLeave = () => {
    setBarVisible(false);
  };

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
              <div className="absolute right-1 mt-2 bg-white border border-gray-300 p-2 w-36 rounded-lg shadow-lg">
                <ul>
                  <li  className="hover:bg-gray-200 px-2 py-1 rounded">
                    <Link
                      to="/logOut"
                      
                    >
                      Log out
                    </Link>
                  </li>
                  <li className="hover:bg-gray-200 px-2 py-1 rounded">
                    <Link to="/cart">
                      Cart
                    </Link>
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
