import React from 'react'
import { Link } from 'react-router-dom'
const HeaderWithLog = () => {
  return (
    <div>
      <div className="flex items-center justify-between p-4">
          <Link to="/" className="text-green-900 text-4xl font-bold cursor-pointer">Shoe Shop</Link>
          <div>
            <Link to="/logOut" className=" p-1 pr-2 text-sm">User</Link>
            
          </div>
        </div>
    </div>
  )
}

export default HeaderWithLog
