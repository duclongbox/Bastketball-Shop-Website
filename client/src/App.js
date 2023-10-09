import React, { useEffect } from 'react'
import { useState } from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Header from "./components/Header";
import Brands from "./components/Brands.jsx";
import NikeComponent from './components/ShoeCompoment/NikeComponent';
import JordanComponent from './components/ShoeCompoment/JordanComponent';
import AdidasComponent from './components/ShoeCompoment/AdidasComponent';
import ShoeInfo from './components/ShoeCompoment/ShoeInfo';
import LogUp from './components/logIn/LogUp';
import LogIn from './components/logIn/LogIn';
import HeaderWithLog from './components/HeaderWithLog';
import SlogInPage from './components/logIn/SlogInPage';

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
  const updateLogState=(newState)=>{
    setisLogIn(newState);
  }
  return (
    <div>
      <Router>
        {!isLogIn?(<Header />):(<HeaderWithLog updateState={updateLogState} />)}
      <Routes>
          <Route path="/" element={  <Brands />} />
          <Route path="/nike" element={<NikeComponent />} />
          <Route path="/shoe/:shoeName" element={<ShoeInfo />} />
          <Route path="/jordan" element={<JordanComponent />} />
          <Route path="/adidas" element={<AdidasComponent />} />
          <Route path="/singUp" element={<LogUp />} />
          <Route path="/signIn" element={<LogIn updateState={updateLogState} />} />
          <Route path="/sLogInPage" element={<SlogInPage />} />
        </Routes>
        </Router>
    </div>

  );
}

export default App;
