import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import NikeComponent from "./components/ShoeCompoment/NikeComponent";
import ShoeInfo from "./components/ShoeCompoment/ShoeInfo";
import LogUp from "./components/logIn/LogUp";
import LogIn from "./components/logIn/LogIn";
import HeaderWithLog from "./components/HeaderWithLog";
import SlogInPage from "./components/logIn/SlogInPage";
import Cart from "./components/Cart";
import Security from "./components/logIn/Security";
import Profile from "./components/logIn/Profile";
import ProfileEdit from "./components/logIn/ProfileEdit";
import Brands from "./components/Brands.jsx";
import LoadSearch from "./components/utility/LoadSearch.jsx";

function App() {
  const [isLogIn, setisLogIn] = useState(false);
  const [isLoadSearch, setLoadSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [clearSearch, setClearSearch] = useState(false);

  const handleChange = (event) => {
    const updatedSearchTerm =  event.target.value;
     setSearchTerm(updatedSearchTerm);
  };

  const clearSearchTerm = () => {
    setSearchTerm("");
  };

  const disLoadSearch = () => {
    setLoadSearch(false);
  };

  useEffect(() => {
    if (searchTerm !== "") {
      setLoadSearch(true);
      setClearSearch(true);
    } else {
      setLoadSearch(false);
      setClearSearch(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/v1/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ searchTerm: searchTerm }),
        });
        const apiData = await response.json();
        setSearchResults(apiData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [searchTerm]);
  // search result success
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/v1/logIn/token");
        if (response.status === 200) {
          setisLogIn(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const updateLogState = () => {
    setisLogIn(false);
  };

  const setTrueLogState = () => {
    setisLogIn(true);
  };
  return (
    <div>
      <Router>
        {!isLogIn ? (
          <Header
            searchTerm={searchTerm}
            clearSearchTerm={clearSearchTerm}
            clearSearch={clearSearch}
            disLoadSearch={disLoadSearch}
            handleChange={handleChange}
          />
        ) : (
          <HeaderWithLog
            searchTerm={searchTerm}
            clearSearchTerm={clearSearchTerm}
            clearSearch={clearSearch}
            disLoadSearch={disLoadSearch}
            updateState={updateLogState}
            handleChange={handleChange}
          />
        )}
        <Routes>
          {!isLoadSearch ? (
            <>
              <Route path="/" element={<Brands />} />
              <Route path="/:brand" element={<NikeComponent />} />
              <Route
                path="/shoe/:shoeName"
                element={<ShoeInfo isLogIn={isLogIn} />}
              />
              <Route path="/singUp" element={<LogUp />} />
              <Route
                path="/signIn"
                element={<LogIn updateState={setTrueLogState} />}
              />
              <Route path="/sLogInPage" element={<SlogInPage />} />
              <Route
                path="/cart"
                element={<Cart updateState={updateLogState} />}
              />
              <Route
                path="/security"
                element={<Security updateState={updateLogState} />}
              />
              <Route
                path="/profile"
                element={<Profile updateState={updateLogState} />}
              />
              <Route path="/profile/edit" element={<ProfileEdit />} />
            </>
          ) : (
            <>
              {["/", "/:brand", "/shoe/:shoeName"].map((path, index) => (
                <Route key={index}
                  path={path}
                  element={
                    <LoadSearch
                      searchResults={searchResults}
                    />
                  }
                />
              ))}
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
