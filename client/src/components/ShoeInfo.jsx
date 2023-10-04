import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";

const ShoeInfo = () => {
  // get the specific shoe info
  const { shoeName } = useParams();
  // get the information based on this shoe
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`api/v1/name/${shoeName}`);
        const apiData = await response.json();
         setData(apiData);
         console.log(apiData.sizes.length);
        // get the cheapest size with price
        let price=999999
        for (let index = 0; index < apiData.sizes.length; index++) {
          if (price>apiData.sizes[index].price) {
            price=apiData.sizes[index].price
            setIndex(index)
          }}
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  console.log(data);

  // // handel the select bar
  const [open, setOpen] = useState(false);
  const handelOpen = () => {
    setOpen(!open);
  };
 
  const handelClickShoe=((index)=>{
    setIndex(index)
  })

  return (
    <div className="flex">
      <div className="m-8">
        <h1 className="font-bold">{data.name}</h1>
        <img src={data.imageURL} alt={data.name} className="h-80 w-auto " />
      </div>
      
      <div className="relative p-8 ml-80 rounded ">
      <h1>Choose your Size!</h1>
        <button onClick={()=>handelOpen()} className="bg-black text-white px-2 py-1 rounded hover:bg-gray-700 w-full">Size:{data.sizes && data.sizes.length > 0 && <div>{data.sizes[index].size}</div>}
</button>
        {open ? (
          <ul className="">
            {data.sizes.map((item, index) => (
              <div key={item._id} >
                <button onClick={() => handelClickShoe(index)}>
                  Size: {item.size} Price: {item.price}
                </button>
              </div>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default ShoeInfo;
