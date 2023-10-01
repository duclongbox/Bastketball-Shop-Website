import React from 'react'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Header from "./components/Header";
import Brands from "./components/Brands.jsx";
import NikeComponent from './components/NikeComponent';
import JordanComponent from './components/JordanComponent';
import AdidasComponent from './components/AdidasComponent';

function App() {
  return (
    <div>
      <Router>
      <Header />
      <Brands />
      <Routes>
          <Route path="/nike" element={<NikeComponent />} />
          <Route path="/jordan" element={<JordanComponent />} />
          <Route path="/adidas" element={<AdidasComponent />} />
       
        </Routes>
        </Router>
    </div>

  );
}

export default App;
