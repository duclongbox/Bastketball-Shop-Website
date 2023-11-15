import { useEffect, useState } from "react"
import React from 'react'
import { GrNext,GrPrevious } from "react-icons/gr"
import { Link } from "react-router-dom"
// this is just for the shoe page row pagination
const RowPagination = ({shoeArr}) => {
const [viewItem,setViewItem]=useState([])
const [lastIndex,setLastIndex]=useState(4)
const [nextButton,setNextButton]=useState(false)
const [previsouButton,setPrevisouButton]=useState(false)
const [isTransition,setIsTransition]=useState(false)
useEffect(() => {
  if (shoeArr.length>5) {
    const viewItem=shoeArr.slice(0,lastIndex+1)
    setViewItem(viewItem)
    setNextButton(true)
  }
  else{
    setViewItem(shoeArr)
  }
},[])


const handelClickNext=()=>{
  // first check if the last index is the last index of the shoeArr
  if (lastIndex+5<shoeArr.length-1) {
    setNextButton(true)
    const viewItem=shoeArr.slice(lastIndex+1,lastIndex+4)
    setLastIndex(lastIndex+4)
    setViewItem(viewItem)
    setPrevisouButton(true)
    
  }
  else {
    setNextButton(false)
    setPrevisouButton(true)
    const viewItem=shoeArr.slice(lastIndex+1,shoeArr.length)
    setViewItem(viewItem)
  }
  setIsTransition(true)
}

const handleClickPrevious = () => {
  if (lastIndex - 5 >= 0) {
    const viewItem = shoeArr.slice(lastIndex - 4, lastIndex);
    setLastIndex(lastIndex - 4);
    setViewItem(viewItem);
    setNextButton(true);
  } else {
    const viewItem = shoeArr.slice(0, lastIndex + 1);
    setViewItem(viewItem);
    setPrevisouButton(false);
    setNextButton(true);
  }
  setIsTransition(true)
};

  return (
    <div className="flex">
      {previsouButton&&<button onClick={handleClickPrevious} ><GrPrevious/></button>}
      <div className="flex w-11/12 m-auto ">
      {viewItem.map((item,index)=>{
        return <div key={index} className={`w-1/5 m-auto transition-opacity duration-300 ease-in-out`}>
          <Link to={`/${item.name}`}>
          <img src={item.imageURL} alt="shoe" className="w-[120px] h-[140px]" />
          <p className="w-[120px]">{item.name.split("-")[0]}</p>
          <p className="w-[120px] text-sm">{item.name.split("-").slice(1).join("-").trim().split("-").join(" ")}</p>
          </Link>
        </div>
      })}
      </div>
      {nextButton&&<button onClick={handelClickNext}><GrNext/></button>}
      
    </div>
  )
}

export default RowPagination
