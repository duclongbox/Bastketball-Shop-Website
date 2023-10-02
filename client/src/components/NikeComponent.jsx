import { useEffect, useState } from "react";
import React from "react";
import { Link } from 'react-router-dom';

const NikeComponent = () => {
  // initialize the current state, fetch data from express
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("api/v1/brand/nike?page=0");
        const apiData = await response.json();
        setData(apiData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetch function inside useEffect

    // Specify an empty dependency array to run the effect only once after the initial render
  }, []);
 
  return (
    <div className="grid lg:grid-cols-3 gap-4 pl-44 pt-10">
      {data.map((item, index) => (

        <div key={item._id} className="p-10">
        <Link to='dwd' >
        <img src={item.imageURL} alt="dww" className="h-40 w-auto max-w-30" />
          <p>Name: {item.name}</p>
          <p>Brand: {item.brand}</p>
          </Link>
        </div>
      ))}

    </div>
  );
};

export default NikeComponent;
