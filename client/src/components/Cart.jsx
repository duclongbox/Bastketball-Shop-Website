import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const Cart = () => {
  const [userInfo, setUserInfo] = useState("");
  const [buyShoeInfo,setBuyShoeInfo]=useState([])
  const [favShoeInfo,setFavShoeInfo]=useState([])

  // shoeArray = apiData.addedItem or apiData.favorItem
  const getShoeInfo=async(shoeArray)=>{
    let shoes=[]
    for (let index = 0; index < shoeArray.length; index++) {
      const id=shoeArray[index].shoeID;
      const pindex=shoeArray[index].index
      try {
        const shoe=await fetch(`/api/v1/cart/${id}?index=${pindex}`)
        shoes.push(await shoe.json())
      } catch (error) {
        console.log(error);  
      }
      
    }
    return shoes
  }

  useEffect(() => {
    // fetch the data from db
    const fetchData = async () => {
      try {
        let apiData;
        const response = await fetch("/api/v1/logIn/getCart");
        apiData = await response.json();

        // fetch the shoe info based on shoe id and the index of price size
        setBuyShoeInfo(await getShoeInfo(apiData.addedItem))
        setFavShoeInfo(await getShoeInfo(apiData.favorItem))
        setUserInfo(apiData.userID);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
      <img src="image/user.jpg" alt="1212" className="w-24"/>
      <p>{userInfo}</p>
    </div>
      <div className="flex justify-between">
        <div className="flex flex-col m-10 mx-36">
        <h2 className="font-bold">Following</h2>
        {favShoeInfo.length!==0?(favShoeInfo.map((element,index)=>{
            return(
            <div className="flex">
              <Link to={`../${element.name}`}><img src={element.imageURL} alt="shoe img" className="w-24 my-4" /></Link>
              <div className="m-4 flex flex-col">
              <p >Shoe Name: {element.name}</p>
              <p>Brand: {element.brand}</p>
              <p>Size: {element.sizes[0].size}</p>
              <p>Price: {element.sizes[0].price}</p>
              </div>
            </div>)
          })):(<div className="my-4">You haven't followed anything</div>)}         
          
        </div>
        <div className="flex flex-col m-10 mx-36">
          <h2 className="font-bold">Buy history</h2>
          {buyShoeInfo.length!==0?(buyShoeInfo.map((element,index)=>{
            return(
            <div className="flex">
              <Link to={`../${element.name}`}><img src={element.imageURL} alt="shoe img" className="w-24 my-4" /></Link>
              <div className="m-4 flex flex-col">
              <p >Shoe Name: {element.name}</p>
              <p>Brand: {element.brand}</p>
              <p>Size: {element.sizes[0].size}</p>
              <p>Price: {element.sizes[0].price}</p>
              </div>
            </div>)
          })):(<>You haven't add anything</>)}
        </div>
      </div>
    </div>
  )
};

export default Cart;
