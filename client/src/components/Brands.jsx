import React from 'react'
import { Link } from 'react-router-dom';
const Brands = () => {
  return (
    <div >
        <h1 className="text-green-900 font-bold p-4">Find out what you want</h1>
        <div className='flex justify-between p-10'>
        <Link to="/nike" >
        <img src="/image/nike.jpg" alt="dww" className="h-40 " />
        </Link>
        <Link to="/jordan" >
        <img src="/image/jordan.svg" alt="dww" className="h-40 " />
        </Link>
        <Link to="/adidas"  >
        <img src="/image/adidas.webp" alt="dww" className="h-40 " />
        </Link>
        </div>
    </div>
  )
}

export default Brands
