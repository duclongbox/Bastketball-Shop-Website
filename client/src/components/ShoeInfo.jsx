import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
const ShoeInfo = () => {
  const { shoeName } = useParams();
  // get the information based on this shoe
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`api/v1/name/${shoeName}`);
        const apiData = await response.json();
        setData(apiData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  });
  return (
  <div>
    <img src={data.imageURL} alt={data.name} className="p-8 h-200 w-auto "/>
    <form action="">
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" />
    </form>
  </div>);

};

export default ShoeInfo;
