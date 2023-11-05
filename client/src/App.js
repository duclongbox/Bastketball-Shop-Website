import React, { useEffect } from 'react'
import { useState } from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Header from "./components/Header";
import Brands from "./components/Brands.jsx";
import NikeComponent from './components/ShoeCompoment/NikeComponent';
import ShoeInfo from './components/ShoeCompoment/ShoeInfo';
import LogUp from './components/logIn/LogUp';
import LogIn from './components/logIn/LogIn';
import HeaderWithLog from './components/HeaderWithLog';
import SlogInPage from './components/logIn/SlogInPage';
import Cart from './components/Cart';
import Security from './components/logIn/Security';
import Profile from './components/logIn/Profile';
import ProfileEdit from './components/logIn/ProfileEdit';

function App() {
  const [isLogIn,setisLogIn]=useState(false);
  useEffect(()=>{
    const fetchData=async ()=>{
      try {
        const response=await fetch("api/v1/logIn/token")
        if (response.status===200) {
          setisLogIn(true)
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  },[])
  const updateLogState=()=>{
    setisLogIn(false);
  }

  const setTrueLogState=()=>{
    setisLogIn(true)
  }
  return (
    <div>
      <Router>
        {!isLogIn?(<Header />):(<HeaderWithLog updateState={updateLogState} />)}
      <Routes>
          <Route path="/" element={  <Brands />} />
          <Route path="/:brand" element={<NikeComponent />} />
          <Route path=":shoeName" element={<ShoeInfo isLogIn={isLogIn} />} />
          <Route path="/singUp" element={<LogUp />} />
          <Route path="/signIn" element={<LogIn updateState={setTrueLogState} />} />
          <Route path="/sLogInPage" element={<SlogInPage />} />
          <Route path="/cart" element={<Cart updateState={updateLogState}/>} />
          <Route path="/security" element={  <Security updateState={updateLogState} />} />
          <Route path="/profile" element={  <Profile updateState={updateLogState} />} />
          <Route path="/profile/edit" element={  <ProfileEdit/>} />
        </Routes>
        </Router>
    </div>

  );
}

export default App;
