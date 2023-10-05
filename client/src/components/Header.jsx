import React from 'react'
import { Link } from "react-router-dom";
const Header = () => {
    return (
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="text-green-900 text-4xl font-bold cursor-pointer">Shoe Shop</Link>
          <div>
            <Link to="/signIn" className=" p-1 pr-2 text-sm">Sign In </Link>
            <Link to="singUp" className="rounded outline bg-gray-700 text-sm text-white p-1 hover:bg-black">Sign Up </Link>
          </div>
        </div>
      );
}

export default Header
