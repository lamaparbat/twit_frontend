import React, {useEffect} from 'react';
import './index.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FaTwitter } from 'react-icons/fa';
import axios from 'axios';

const Index = () => {
  //create useNavigate instance
  const redirect = useNavigate();

  // validate cache
  const validateCache = async () => {
    try {
      const res = await axios.create({
        baseURL: 'http://localhost:8080',
        timeout: 1000,
        headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem("token") }
      }).get("/twitter/validateCache");
    } catch (error) {
      setTimeout(() => {
        redirect("/");
      }, 1000);
    }
  }

  useEffect(() => {
    try {
      validateCache();
    } catch (error) {
      console.log(error)
    }
  }, []);  
  
  
  // on logout btn clicked
  const logout = async () => {
    try {
      const res = await axios.create({
        baseURL: 'http://localhost:8080',
        timeout: 1000,
        headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem("token") }
      }).get("/twitter/logout");
      toast.success("Logout succesfully ")
      redirect("/")
    } catch (error) {
      toast.error("Failed to logout")
    }
  }
  
  
  return (
    <div className="homepage container-fluid d-flex flex-column justify-content-center align-items-center rounded-1 bg-dark text-light">
      <h1>Welcome to the twitter dashboard</h1><br/><br/>
      <h1 id='logo'><FaTwitter /></h1><br /><br /><br /><br /><br /><br />
      <button className='btn btn-danger px-5' onClick={logout}>Logout</button>
      <ToastContainer />
    </div>
  )
}

export default Index;
