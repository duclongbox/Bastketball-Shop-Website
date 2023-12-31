import React from 'react'
import { Link } from 'react-router-dom';
const LoadSearch = ({searchResults,disLoadSearch}) => {
  return (
    <div>
      { searchResults.result.map((item,index) => {
        return (
        <div className='mx-auto my-3 w-3/4  justify-left'>

        <Link  to={`/shoe/${item.name}`}  onClick={disLoadSearch} >

        <div key={index} className=' flex mx-[30px] items-center '>
          <img src={item.imageURL} alt="" className='w-[120px]' />
          <div className='flex-col mx-6'>
            <p className='text-sm font-light'>{item.brand}</p>
            <p className='font-bold text-lg'>{item.name.replace(/[-\s]/g,' ')}</p>
          </div>   
        </div>
        <div className="border-t border-gray-300 w-full my-3"></div>
        </Link>
        </div>
        )
      })}
    </div>
    
  )
}

export default LoadSearch
