import {React} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
const SearchBar = ({handleChange,clearSearch,clearSearchTerm,searchTerm}) => {
  
return (
<div>
<div className="flex border-2 border-black w-[600px] mx-[200px] bg-gray-100 relative">
  <input
    type="text"
    placeholder="Enter brand or name"
    value={searchTerm}
    onChange={(e) => handleChange(e)}
    className="w-full py-2 pl-10 pr-4"
  />
  <AiOutlineSearch className="absolute left-3 top-3 text-gray-500" />
  {clearSearch&&<button className='absolute right-3 top-2 font-semibold' onClick={clearSearchTerm}>X</button>}
  </div>
</div>

  )
}

export default SearchBar
