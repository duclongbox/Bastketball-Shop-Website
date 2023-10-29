import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
const ShoeInfo = (props) => {
  // get the specific shoe info
  const { shoeName } = useParams();
  // get the information based on this shoe
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [cheapest, setCheapest] = useState(0);
  const [displayAdd, setDisplayAdd] = useState(false);
  const [clickFollow, setClickFollow] = useState(false);
  const [reminder, setReminder] = useState(false);
  const [isOnlyBid, setisOnlyBid] = useState(false);
  const [relateShoe,setRelateShoe]=useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(`api/v1/name/${shoeName}`);
        const apiData1 = await response1.json();
        setData(apiData1);
        // get the cheapest size with price
        let price = 999999;
        for (let index = 0; index < apiData1.sizes.length; index++) {
          if (price > apiData1.sizes[index].price) {
            price = apiData1.sizes[index].price;
            setIndex(index);
            setCheapest(price);
          }
        }
        // get the related shoe 
        const response2=await fetch(`api/v1/relate/${shoeName}`)
        const apiData2=await response2.json();
        setRelateShoe(apiData2)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  console.log(relateShoe);

  const name = data?.name?.split("-")[0] ?? 'Default Name';
  const category=data?.name?.split("-").slice(1).join("-").trim().split("-").join(" ")??'Default Name';
  
  const handelClickHeart = () => {
    setClickFollow(true);
    if (props.isLogIn) {
      fetch("/api/v1/logIn/addCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ likeIndex: index, likeShoeID: data._id }),
        withCredentials: true,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success === false) {
            setReminder(true);
          }
          else setReminder(false)
        })
        .catch((error) => console.log(error));
    }
  };

  const handelBuyButton = () => {
    if (props.isLogIn) {
      fetch("/api/v1/logIn/addCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ index: index, shoeID: data._id }),
        withCredentials: true,
      })
        .then((response) => response.json())

        .catch((error) => console.error(error));
    }

    setDisplayAdd(true);
  };

  // // handel the select bar
  const [open, setOpen] = useState(false);
  const handelOpen = () => {
    setOpen(!open);
  };

  const handelClickShoe = (index) => {
    setisOnlyBid(false);
    setIndex(index);
    handelOpen();
  };

  const onlyBid = (index) => {
    setisOnlyBid(true);
    setIndex(index);
    handelOpen();
  };


  return (
    <div className="flex-col items-center justify-center w-3/4 mx-auto">
    <div className="flex items-center  justify-center ">
      <div className="m-6">
        <h1 className="font-bold">{name}</h1>
        <p className="text-sm">{category}</p>
        <div className="relative flex">
          <img src={data.imageURL} alt={data.name} className="h-80 w-auto " />
          <button
            onClick={handelClickHeart}
            className={`absolute top-0 right-0 m-4 w-9 focus:outline-none ${
              clickFollow ? "text-red-500" : "text-gray-500"
            }`}
          >
            <FiHeart />
          </button>
        </div>
        <div>
          {clickFollow ? (
            reminder ? (
              <p className="font-bold m-4">
                You have already followed this item
              </p>
            ) : (
              <p className="font-bold m-4">Successfully added!</p>
            )
          ) : null}
        </div>
      </div>

      <div className="relative p-6 ml-6 rounded ring-1 ring-gray-800 ring-opacity-30 w-[450px] h-auto">
        <div className="relative">
          <button
            onClick={() => handelOpen()}
            className="px-2 w-full py-1 rounded flex justify-between ring-1 ring-gray-800 ring-opacity-50 "
          >
            <span className="m-1 ">Size:</span>

            {data.sizes && data.sizes.length > 0 && (
              <div className="m-1">US: {data.sizes[index].size}</div>
            )}
          </button>
          {open ? (
            <div className="absolute  h-[400px] top-full  w-full bg-white border border-gray-300">
              <div className="h-full overflow-y-auto no-scrollbar">
                <p className="text-[10px] font-bold m-1">
                  Size and Conversions
                </p>
                <div className="flex justify-between w-auto m-2">
                  <button className="px-2 m-1 bg-gray-200 rounded-full ring-1 ring-gray-800 ring-opacity-50">
                    US M
                  </button>
                  <button className="px-2 m-1 bg-gray-200 rounded-full ring-1 ring-gray-800 ring-opacity-50">
                    US W
                  </button>
                  <button className="px-2 m-1 bg-gray-200 rounded-full ring-1 ring-gray-800 ring-opacity-50">
                    UK
                  </button>
                  <button className="px-2 m-1 bg-gray-200 rounded-full ring-1 ring-gray-800 ring-opacity-50">
                    CM
                  </button>
                  <button className="px-2 m-1 bg-gray-200 rounded-full ring-1 ring-gray-800 ring-opacity-50">
                    KR
                  </button>
                  <button className="px-2 m-1 bg-gray-200 rounded-full ring-1 ring-gray-800 ring-opacity-50">
                    EU
                  </button>
                </div>

                <div className="w-auto rounded-[1px] p-1 ring-1 ring-gray-800 ring-opacity-50 m-3 grid justify-center">
                  <button>
                    All <p>${cheapest}</p>
                  </button>
                </div>

                <ul className="flex flex-wrap my-2 justify-between">
                  {data.sizes.map((item, index) => (
                    <div key={item._id} className="w-1/3">
                      {item.stock > 0 ? (
                        <button
                          onClick={() => handelClickShoe(index)}
                          className={` text-sm rounded-[1px]  ring-1 ring-gray-800 ring-opacity-50 px-3 m-4 w-[100px] h-[50px] hover:bg-gray-100`}
                        >
                          US M: {item.size}{" "}
                          <p className="text-green-800">${item.price}</p>
                        </button>
                      ) : (
                        <button
                          className={` text-sm  rounded-[1px] ring-1 ring-gray-800 ring-opacity-50 px-3 m-4 w-[100px] h-[50px] hover:bg-gray-100`}
                          onClick={() => onlyBid(index)}
                        >
                          US M: {item.size} <p>Bid</p>
                        </button>
                      )}
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>

        {!open ? (
          !isOnlyBid ? (
            data.sizes ? (
              <div className="flex ">
                <button className=" x-7 py-2 m-6 p-3 bg-gray-300 hover:bg-gray-400">
                  Place Bid
                </button>
                <button
                  onClick={handelBuyButton}
                  className=" bg-green-800 text-white hover:bg-green-900 px-7 py-2 m-6"
                >
                  Buy CA$ {data.sizes[index].price}
                </button>
              </div>
            ) : null
          ) : (
            <button className="rounded x-7 py-2 m-6 p-3 w-2/3 bg-gray-300 hover:bg-gray-400">
              Place Bid
            </button>
          )
        ) : null}
           <div className="border-t border-gray-300 w-full"></div>
           <button className="m-6 mx-1 text-green-800 w-full">Sell for $71 or Ask for More</button>

        {displayAdd ? (
          props.isLogIn ? (
            <p className="font-bold">
              Shoe {data.name} has been added into your cart
            </p>
          ) : (
            <p className="font-bold">Please Log In first</p>
          )
        ) : null}
      </div>
    </div>
    <div className="border-t border-gray-300 w-auto m-2"></div>
    <p className="my-1 font-bold">Related Products</p>
    <div>

    </div>
    </div>
  );
};

export default ShoeInfo;
