import React from 'react'

const Header = () => {
    return (
        <div className="flex items-center justify-between p-4">
          <h1 className="text-green-900 text-4xl font-bold cursor-pointer">Shoe Shop</h1>
          <div>
            <button className="   p-1 pr-2 text-sm">Sign In </button>
            <button className="rounded outline bg-gray-700 text-sm text-white p-1 hover:bg-black">Sign Up </button>
          </div>
        </div>
      );
}

export default Header
