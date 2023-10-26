import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import LeftColumn from "./utility/LeftColumn";
const Cart = ({updateState}) => {
  const [userInfo, setUserInfo] = useState("");
  const [buyShoeInfo, setBuyShoeInfo] = useState([]);
  const [favShoeInfo, setFavShoeInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [favorModal, setFavorModal] = useState(false);
  // shoeArray = apiData.addedItem or apiData.favorItem
  const getShoeInfo = async (shoeArray) => {
    let shoes = [];
    for (let index = 0; index < shoeArray.length; index++) {
      const id = shoeArray[index].shoeID;
      const pindex = shoeArray[index].index;
      try {
        const shoe = await fetch(`/api/v1/cart/${id}?index=${pindex}`);
        shoes.push(await shoe.json());
      } catch (error) {
        console.log(error);
      }
    }
    return shoes;
  };

  useEffect(() => {
    // fetch the data from db
    const fetchData = async () => {
      try {
        let apiData;
        const response = await fetch("/api/v1/logIn/getCart");
        apiData = await response.json();

        // fetch the shoe info based on shoe id and the index of price size
        setBuyShoeInfo(await getShoeInfo(apiData.addedItem));
        setFavShoeInfo(await getShoeInfo(apiData.favorItem));
        setLoading(true);
        setUserInfo(apiData.userID);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const setModalOpen = (set) => {
    setOpenModal(set);
  };

  const setFavorModal1 = (set) => {
    setFavorModal(set);
  };

  const handelDelete = (deleteH, index) => {
    // delete history
    fetch("/api/v1/logIn/deleteH", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ index: index, history: deleteH }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    setOpenModal(false);
    window.location.reload();
  };
  return (
    <div className="h-screen flex">
      <div className="bg-gray-50">
        <LeftColumn userName={userInfo} updateState={updateState}></LeftColumn>
      </div>
      <div className="h-full">
      <div className="flex justify-between h-full overflow-y-auto ">
        <div className="flex flex-col m-10 mx-32">
          <h2 className="font-bold">Following</h2>

          {loading ? (
            favShoeInfo.length !== 0 ? (
              favShoeInfo.map((element, index) => {
                return (
                  <div key={index}>
                    <div className="flex">
                      <Link to={`../${element.name}`}>
                        <img
                          src={element.imageURL}
                          alt="shoe img"
                          className="w-24 my-4"
                        />
                      </Link>
                      <div className="m-4 flex flex-col">
                        <p>Shoe Name: {element.name}</p>
                        <p>Brand: {element.brand}</p>
                        <p>Size: {element.sizes[0].size}</p>
                        <p>Price: {element.sizes[0].price}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setFavorModal1(true)}
                      className="rounded-lg border-2 p-2 text-sm  hover:bg-gray-200 "
                    >
                      Unfollow
                    </button>
                    <Modal isOpen={favorModal} className="bg-green-300">
                      <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center ">
                        <div className="fixed bg-gray-200 px-6 py-20 rounded">
                          <button
                            onClick={() => setFavorModal1(false)}
                            className="absolute right-0 top-0 w-4 "
                          >
                            x
                          </button>
                          <p className="text-lg font-bold mb-4">
                            Do you want to unfollow this shoe?
                          </p>
                          <button
                            onClick={() => handelDelete(false, index)}
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Unfollow
                          </button>
                        </div>
                      </div>
                    </Modal>
                  </div>
                );
              })
            ) : (
              <div className="my-4">You haven't followed anything</div>
            )
          ) : (
            <div className="my-4">Loading: Sorry for the speed of fetching</div>
          )}
        </div>
        <div className="flex flex-col m-10 mx-32">
          <h2 className="font-bold">Buy history</h2>
          {loading ? (
            buyShoeInfo.length !== 0 ? (
              buyShoeInfo.map((element, index) => {
                return (
                  <div key={index}>
                    <div className="flex">
                      <Link to={`../${element.name}`}>
                        <img
                          src={element.imageURL}
                          alt="shoe img"
                          className="w-24 my-4"
                        />
                      </Link>
                      <div className="m-4 flex flex-col">
                        <p>Shoe Name: {element.name}</p>
                        <p>Brand: {element.brand}</p>
                        <p>Size: {element.sizes[0].size}</p>
                        <p>Price: {element.sizes[0].price}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setModalOpen(true)}
                      className="rounded-lg border-2 p-2 text-sm  hover:bg-gray-200 "
                    >
                      Delete
                    </button>
                    <Modal isOpen={openModal} className="bg-green-300">
                      <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center ">
                        <div className="fixed bg-gray-200 px-6 py-20 rounded">
                          <button
                            onClick={() => setModalOpen(false)}
                            className="absolute right-0 top-0 w-4 "
                          >
                            x
                          </button>
                          <p className="text-lg font-bold mb-4">
                            Do you want to delete this history?
                          </p>
                          <button
                            onClick={() => handelDelete(true, index)}
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </Modal>
                  </div>
                );
              })
            ) : (
              <>You haven't add anything</>
            )
          ) : (
            <div className="my-4">Loading: Sorry for the speed of fetching</div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Cart;
