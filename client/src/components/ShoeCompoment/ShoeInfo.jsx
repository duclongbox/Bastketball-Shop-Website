import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";

const ShoeInfo = (props) => {
  // get the specific shoe info
  const { shoeName } = useParams();
  // get the information based on this shoe
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [displayAdd,setDisplayAdd]=useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`api/v1/name/${shoeName}`);
        const apiData = await response.json();
        setData(apiData);
        // get the cheapest size with price
        let price = 999999;
        for (let index = 0; index < apiData.sizes.length; index++) {
          if (price > apiData.sizes[index].price) {
            price = apiData.sizes[index].price;
            setIndex(index);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);


  const handelBuyButton=()=>{

    if (props.isLogIn) {
      fetch("/api/v1/logIn/addCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({index:index,shoeID:data._id}),
        withCredentials: true
      })
        .then((response) => response.json())
        
        .catch((error) => console.error(error));
    }
    
    setDisplayAdd(true)
  }

  // // handel the select bar
  const [open, setOpen] = useState(false);
  const handelOpen = () => {
    setOpen(!open);
  };

  const handelClickShoe = (index) => {
    setIndex(index);
    handelOpen();
  };

  return (
    <div className="flex">
      <div className="m-8">
        <h1 className="font-bold">{data.name}</h1>
        <img src={data.imageURL} alt={data.name} className="h-80 w-auto " />
      </div>

      <div className=" p-8 ml-80  ">
        <h1>Choose your Size!</h1>
        <button
          onClick={() => handelOpen()}
          className="bg-black text-white px-2 py-1 rounded hover:bg-gray-700 w-full"
        >
          Size:
          {data.sizes && data.sizes.length > 0 && (
            <div>{data.sizes[index].size}</div>
          )}
        </button>
        {open ? (
          <ul className="px-7 py-2">
            {data.sizes.map((item, index) => (
              <div key={item._id}>
                <button
                  onClick={() => handelClickShoe(index)}
                  className="px-7 py-2"
                >
                  Size: {item.size} Price: {item.price}
                </button>
              </div>
            ))}
          </ul>
        ) : null}
        {data.sizes && !open ? (
          <button onClick={handelBuyButton} className="rounded bg-green-800 text-white hover:bg-green-900 px-7 py-2 m-6">
            Buy CA$ {data.sizes[index].price}
          </button>
        ) : null}

        {displayAdd?(props.isLogIn?(<p className="font-bold">Shoe {data.name} has been added into your cart</p>):(<p className="font-bold">Please Log In first</p>)):null}
      </div>
    </div>
  );
};

export default ShoeInfo;
