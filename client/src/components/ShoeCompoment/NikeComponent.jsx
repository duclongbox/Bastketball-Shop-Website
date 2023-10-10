import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

function Items({ currentItems }) {
  return (
    <div className="grid lg:grid-cols-3 gap-4 pl-44 pt-10">
      {currentItems &&
        currentItems.map((item) => (
          <div key={item._id} className="p-10">
            <Link to={`../${item.name}`}>
              <img
                src={item.imageURL}
                alt={item.name}
                className="h-40 w-auto max-w-30"
              />
              <p>Name: {item.name}</p>
              <p>Brand: {item.brand}</p>
            </Link>
          </div>
        ))}
    </div>
  );
}

const NikeComponent = () => {
  // initialize the current state, fetch data from express
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("api/v1/brand/nike");
        const apiData = await response.json();
        setData(apiData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // paginate
  const itemsPerPage = 6;
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div>
      <Items currentItems={currentItems} />
      <ReactPaginate
        className="flex  gap-4 justify-center p-4"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel=""
        renderOnZeroPageCount={null}
      ></ReactPaginate>
    </div>
  );
};

export default NikeComponent;
