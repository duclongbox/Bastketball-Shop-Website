import {React,useEffect,useState} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
    const handleChange = event => {
        setSearchTerm(event.target.value);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/v1/search`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({searchTerm:searchTerm}),
                });
                const apiData = await response.json();
                setSearchResults(apiData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [searchTerm]);
  
return (
<div className="flex border-2 border-black w-[600px] mx-[200px] bg-gray-100 relative">
  <input
    type="text"
    placeholder="Enter brand or name"
    onChange={(e) => handleChange(e)}
    className="w-full py-2 pl-10 pr-4"
  />
  <AiOutlineSearch className="absolute left-3 top-3 text-gray-500" />
</div>

  )
}

export default SearchBar
