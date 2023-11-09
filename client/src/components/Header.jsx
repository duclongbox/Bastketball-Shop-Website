import React from 'react'
import { useState } from 'react';
import SearchBar from './utility/SearchBar';
import { Link } from "react-router-dom";
const Header = ({handleChange,disLoadSearch,clearSearch,clearSearchTerm,searchTerm}) => {
  const [searhBarVisible, setSearhBarVisible] = useState(true);
  const dismissSearchBar = () => {
    setSearhBarVisible(false)
  }
  const showSearchBar = () => {setSearhBarVisible(true)
    disLoadSearch()
  }
    return (
        <div className="flex items-center justify-between p-4">
          <Link to="/" onClick={showSearchBar} className="text-green-900 text-4xl font-bold cursor-pointer">Shoe Shop</Link>
          {searhBarVisible && <SearchBar searchTerm={searchTerm}  clearSearchTerm={clearSearchTerm} clearSearch={clearSearch}  handleChange={handleChange} />}
          <div className='ml-auto'>
            <Link to="/signIn" className=" p-1 pr-2 text-sm" onClick={dismissSearchBar}>Sign In </Link>
            <Link to="/singUp" onClick={dismissSearchBar} className="rounded outline bg-gray-700 text-sm text-white p-1 hover:bg-black">Sign Up </Link>
          </div>
          <bg/>
        </div>
      );
}

export default Header
