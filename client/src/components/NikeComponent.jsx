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
    <div>
      {data.map((item, index) => (

        <div key={index}>
          <p>Name: {item.name}</p>
          <p>Brand: {item.brand}</p>
          <Link to='dwd' >
        <img src={item.imageURL} alt="dww" className="h-40 " />
        </Link>
        </div>
      ))}

    </div>
  );
};

export default NikeComponent;
