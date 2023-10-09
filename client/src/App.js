import React from 'react'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Header from "./components/Header";
import Brands from "./components/Brands.jsx";
import NikeComponent from './components/ShoeCompoment/NikeComponent';
import JordanComponent from './components/ShoeCompoment/JordanComponent';
import AdidasComponent from './components/ShoeCompoment/AdidasComponent';
import ShoeInfo from './components/ShoeCompoment/ShoeInfo';
import LogUp from './components/logIn/LogUp';
import LogIn from './components/logIn/LogIn';

function App() {
  return (
    <div>
      <Router>
      <Header />
      <Routes>
          <Route path="/" element={  <Brands />} />
          <Route path="/nike" element={<NikeComponent />} />
          <Route path="/shoe/:shoeName" element={<ShoeInfo />} />
          <Route path="/jordan" element={<JordanComponent />} />
          <Route path="/adidas" element={<AdidasComponent />} />
          <Route path="/singUp" element={<LogUp />} />
          <Route path="/signIn" element={<LogIn />} />
        </Routes>
        </Router>
    </div>

  );
}

export default App;
