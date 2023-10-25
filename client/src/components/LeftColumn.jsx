import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import HandelLogOut from './utility/HandelLogOut';
import { useNavigate } from "react-router-dom";
const LeftColumn = ({userName,updateState}) => {
    const navigate=useNavigate();
    const [openModal,setOpenModal]=useState(false)
    const [logOut, setLogOut] = useState(false);

    const msetLogOut= () => {
      setLogOut(true)
    }
  

    const clickLogOut=()=>{
        setOpenModal(true)
        return (
            <HandelLogOut logOutState={logOut} openModal={openModal}/>
        )
    }
    const trulyLogOut=()=>{
        updateState(false)
        navigate("/")
    }
  return (
    <div>
      <p className='font-bold text-xl px-2'>{userName}</p>
      <ul>
        <li>
            <Link to="/">
            <button className='py-4 hover:bg-gray-100'>
            <p className='font-bold'>Security</p>
            <p className='text-gray-600 text-xs w-36'>Two-step verification</p>
            </button>
            </Link>
        </li>
        <li >
            <Link to="/cart">
            <button className='py-4 hover:bg-gray-100'>
            <p className='font-bold'>Cart</p>
            <p className='text-gray-600 text-xs w-36'>Check out your buying history and following items</p>
            </button>
            </Link>
        </li>
        <li >
        <button className='py-4 hover:bg-gray-100'>
            <p className='font-bold'>Profile</p>
            <p className='text-gray-600 text-xs w-36'>Learn what is unique to you</p>
            </button>
        </li>
        <li>
        <button className='py-4 px-10 hover:bg-gray-100' onClick={clickLogOut}>
            <p className='font-bold'>Lag out</p>
            {openModal && <HandelLogOut setLogOut={msetLogOut}/>}
            {logOut&&trulyLogOut()}
            </button>
        </li>
      </ul>
    </div>
  )
}

export default LeftColumn
