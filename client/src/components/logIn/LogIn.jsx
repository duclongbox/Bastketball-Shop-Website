import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const LogIn = ({updateState}) => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    userID: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform form validation or send the data to your API here
    console.log("Form submitted with data:", formData);
    // Example: Sending data to an API endpoint using fetch
    fetch("/api/v1/logIn/logIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      withCredentials: true
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          updateState(true);
          console.log(data);
          navigate("/sLogInPage")
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
        <div className="flex flex-col items-center justify-center h-screen">
          <img src="image/logIn.jpg" alt="not load" className="w-28 mb-4 " />
          <p className="text-3xl font-semibold">Log In</p>
          <form onSubmit={handleSubmit} method="POST" className="mt-6">
            <label htmlFor="userID" className="text-lg font-medium">
              Email:
            </label>
            <input
              type="text"
              id="userID"
              name="userID"
              value={formData.userID}
              onChange={handleInputChange}
              required
              className="w-52 ml-10 border-2 rounded border-gray-700 m-2"
              placeholder="Enter your email"
            />
            <br />
            <label htmlFor="password" className="text-lg font-medium">
              Password:
            </label>
            <input
              type="text"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-52 border-2 rounded border-gray-700 m-2"
              placeholder="Enter your password"
            />
            <br />
            <div className="ml-20">
              <button
                type="submit"
                className="border-2 p-2 m-4 rounded-lg bg-black text-white hover:bg-gray-800"
              >
                Submit
              </button>
              <Link to="/singUp">Sign Up</Link>
            </div>
          </form>
        </div>
    </div>
  );
};

export default LogIn;
