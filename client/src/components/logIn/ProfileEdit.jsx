import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const ProfileEdit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    shoeSize: "",
    email: "",
  });

  // get the user inf frm db
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/v1/logIn/token");
        const apiData = await response.json();
        setFormData(apiData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/v1/logIn/editProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      withCredentials: true,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          navigate("/profile");
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="flex justify-center">
      <div className="flex-col">
        <p className="font-semibold text-4xl">Profile</p>
        <p>Change your profile settings</p>
        <form onSubmit={handleSubmit} method="POST" className="mt-6">
          <div className="my-3">
            <label htmlFor="name" className="text-lg font-medium">
              Name
            </label>
            <div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full border rounded-sm bg-gray-100 border-gray-700"
              />
            </div>
          </div>
          <div className="my-3">
            <label htmlFor="shoeSize" className="text-lg font-medium">
              shoe size
            </label>
            <div>
              <select
                type="text"
                id="shoeSize"
                name="shoeSize"
                value={formData.shoeSize}
                onChange={handleInputChange}
                required
                className="w-full border rounded-sm  bg-gray-100 border-gray-700 focus:outline-none focus:border-blue-500"
              >
                <option value="">Default Size</option>
                <option value="3.5">3.5</option>
                <option value="4">4</option>
                <option value="4.5">4.5</option>
                <option value="5">5</option>
                <option value="5.5">5.5</option>
              </select>
            </div>
          </div>
          <div className="my-3">
            <label htmlFor="email" className="text-lg font-medium">
              Contact Info
            </label>
            <div>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full border bg-gray-100  rounded-sm border-gray-700"
              />
            </div>
          </div>
          <div className="flex ml-20">
            <Link to="/profile" className="border-2  rounded-lg p-2 m-4 hover:bg-gray-100 ">
              Cancel
            </Link>
            <button
              type="submit"
              className="border-2 p-2 m-4 rounded-lg bg-black text-white hover:bg-gray-700"
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
