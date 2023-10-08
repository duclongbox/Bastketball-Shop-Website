import React from 'react'
import { useState } from 'react';
const LogUp = () => {
  const [formData, setFormData] = useState({
    userID: '',
    password: ''
  });

  const [submit,setSubmit]=useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform form validation or send the data to your API here
    console.log('Form submitted with data:', formData);
    // Example: Sending data to an API endpoint using fetch
    fetch('api/v1/logIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data=>{
        if (!data.success) {
          setSubmit(false);
        }
      })
      .catch(error => console.error(error));
  };


  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <img src="image/logIn.jpg" alt='not load' className='w-28 mb-4 ' />
        <p className='text-3xl font-semibold'>Log Up</p>
      <form onSubmit={handleSubmit} method='POST' className='mt-6'>
        <label htmlFor="userID" className='text-lg font-medium'>Email:</label>
        <input type="text" id="userID" name="userID" value={formData.userID} onChange={handleInputChange} required className="w-52 border-2 rounded border-gray-700 m-2" placeholder='Enter your email'/><br/>
        <label htmlFor="password" className='text-lg font-medium'>Password:</label>
        <input type="text" id="password" name="password" value={formData.password} onChange={handleInputChange} required className="w-52 border-2 rounded border-gray-700 m-2" placeholder='Enter your password'/><br/>
        <button type='submit' className='border-2 p-2 m-4 rounded-lg bg-black text-white hover:bg-gray-800'>Submit</button>
      </form>
      {!submit?(<div>Your email has been entered, Please enter another email</div>):null}
    </div>
  )
}

export default LogUp
