import React from 'react'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Header from "./components/Header";
import Brands from "./components/Brands.jsx";
import NikeComponent from './components/NikeComponent';
import JordanComponent from './components/JordanComponent';
import AdidasComponent from './components/AdidasComponent';
import ShoeInfo from './components/ShoeInfo';

function App() {
  return (
    <div>
      <Router>
      <Header />
      <Routes>
    
      <Route path="/" element={  <Brands />} />
          <Route path="/nike" element={<NikeComponent />} />
          <Route path="/:shoeName" element={<ShoeInfo />} />
          <Route path="/jordan" element={<JordanComponent />} />
          <Route path="/adidas" element={<AdidasComponent />} />
       
        </Routes>
        </Router>
    </div>

  );
}

export default App;
