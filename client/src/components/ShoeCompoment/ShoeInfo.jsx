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
  const [displayAdd, setDisplayAdd] = useState(false);
  const [clickFollow, setClickFollow] = useState(false);
  const [reminder, setReminder] = useState(false);
  const [isOnlyBid, setisOnlyBid] = useState(false);
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

  const handelClickHeart = () => {
    console.log(index);
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
    setisOnlyBid(false)
    setIndex(index);
    handelOpen();
  };

  const onlyBid = () => {
    setisOnlyBid(true);
    handelOpen();
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="m-6">
        <h1 className="font-bold">{data.name}</h1>
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

      <div className="relative p-6 ml-6 rounded ring-1 ring-gray-800 ring-opacity-30 w-1/4 h-60">
        <div className="relative">
        <button
          onClick={() => handelOpen()}
          className="px-2  w-full py-1 rounded flex justify-between ring-1 ring-gray-800 ring-opacity-50 "
        >
          <span className="mr-2">Size:</span>
          
          {data.sizes && data.sizes.length > 0 && (
            <div>US: {data.sizes[index].size}</div>
          )}
        </button>
        {open ? (
           <div className="absolute  h-screen top-full left-0 w-full bg-white border border-gray-300">
          <ul className="px-7 flex flex-wrap py-2 h-full overflow-y-auto no-scrollbar">
            {data.sizes.map((item, index) => (
              <li key={item._id} className="w-1/3 px-2 mb-2">
           
                {(item.stock > 0) ? (

                  <button
                    onClick={() => handelClickShoe(index)}
                    className={`px-7 py-2  `}
                  >
                    Size: {item.size} Price: {item.price}
                  </button>

                ) : (

                  <button className={`px-7 py-2 `} onClick={onlyBid}>
                    Size: {item.size} Bid
                  </button>

                )}
              </li>
            ))}
          </ul>

          </div>
        ) : null}</div>

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
  );
};

export default ShoeInfo;
