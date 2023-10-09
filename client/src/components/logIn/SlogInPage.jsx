import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const SlogInPage = () => {
    const navigate=useNavigate()
    useEffect(()=>{
        const timer=setTimeout(()=>{
            navigate('/')
        },2000)
        return()=>clearTimeout(timer);
    },[])
  return (
    <div className='font-bold text-center h-screen flex justify-center items-center'>
      Successfully log in
    </div>
  )
}

export default SlogInPage
