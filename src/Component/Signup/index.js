import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Dashboard/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTwitter } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

const Index = () => {
  // form state
  const [data, setData] = useState({
    username: "",
    password:""
  })
  
  //create insatnce of navigator
  const redirect = useNavigate()
  
  // on signup button clicked
  const signup = async () => {
    //validation
    if (data.username.length < 2 & data.password.length < 2)
      return toast.warn("Input field is empty !")
    
    try {
      const result = await axios.post("http://localhost:8080/twitter/signup", {
        email: data.username,
        password: data.password
      });
      redirect("/")
      return toast.success("Account created succesfully ");
    } catch (error) {
      return toast.error("Failed to create account !")
    }

  }
  
  return (
    <div className="homepage container-fluid p-3 d-flex justify-content-center align-items-center bg-dark text-light">
      <div className='form p-4 d-flex flex-column align-items-center justify-content-center rounded-1'>
        <h3 className='my-4 d-flex text-danger align-items-center'><FaTwitter className='mx-3' /> Twitter Signup</h3>
        <input className='form-control bg-dark border-danger text-danger mb-3'
          type="email"
          placeholder='Enter email or phone number'
          onChange={(e) => setData({...data, username:e.target.value})}
          required
        />
        <input className='form-control bg-dark border-danger text-danger'
          type="password"
          placeholder='Enter password'
          onChange={(e) => setData({ ...data, password: e.target.value })}
          required
        /><br /> 
        <button className='btn btn-danger w-75 text-light rounded-1' onClick={signup}>Sign up</button>
        <div className='my-3' id='separator'> ----------or ----------</div>
        <button className='btn btn-dark text-danger border-danger w-75 rounded-1' onClick={() => redirect("/")}>Login</button><br />
      </div>
      <ToastContainer />
    </div>
  )
}

export default Index;
