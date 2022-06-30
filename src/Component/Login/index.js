import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Dashboard/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTwitter } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import firebase from 'firebase/compat/app';

const Index = () => {
  // form state
  const [data, setData] = useState({
    username: "",
    password:""
  })
  
  //create insatnce of navigator
  const redirect = useNavigate()
  
  // validate cache
  const validateCache = async () => {
    try {
      await axios.create({
        baseURL: 'http://localhost:8080',
        timeout: 1000,
        headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem("token") }
      }).get("/twitter/validateCache");
      redirect("/dashboard");
    } catch (error) {
      console.clear();
      redirect("/");
    }
  }
  
 // login with twitter
  const socialAuthLogin = async (email) => {
    try {
      const result = await axios.post("http://localhost:8080/twitter/socialAuth", {
        username: email
      });
      console.log(result)
      window.localStorage.setItem("token", result.data.token);
      toast.success("Login successfull !");
      setTimeout(() => {
        redirect("/dashboard");
      }, 100);
    } catch (error) {
      toast.error("Logi failed !")
    }
  }

  // on state changed
  useEffect(() => {
    validateCache();
  }, []);
  
  
  
  // on login button clicked
  const login = async () => {
    //validation
    if (data.username.length < 2 & data.password.length < 2)
      return toast.warn("Input field is empty !")
    try {
      const result = await axios.post("http://localhost:8080/twitter/Login", {
        username: data.username,
        password: data.password
      });
      window.localStorage.setItem("token", result.data.token);
      toast.success("Login successfull !");
      setTimeout(() => {
        redirect("/dashboard");
      }, 100);
    } catch (error) {
      toast.error("Logi failed !")
    }

  }
  
  const loginWithGoogle = async() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const email = result.user._delegate.email;
        socialAuthLogin(email);
      }).catch((error) => {
        console.log(error);
      });
  }

  
  return (
    <div className="homepage container-fluid p-3 d-flex justify-content-center align-items-center bg-dark text-light">
      <div className='form p-4 d-flex flex-column align-items-center justify-content-center rounded-1'>
        <h3 className='my-4 d-flex align-items-center'><FaTwitter className='mx-3' /> Twitter Login</h3>
        <input className='form-control bg-dark border-info text-info mb-3'
          type="email"
          placeholder='Enter email or phone number'
          onChange={(e) => setData({...data, username:e.target.value})}
          required
        />
        <input className='form-control bg-dark border-info text-info'
          type="password"
          placeholder='Enter password'
          onChange={(e) => setData({ ...data, password: e.target.value })}
          required
        /><br /> 
        <button className='btn btn-info w-75 text-light rounded-1' onClick={login}>Log in</button>
        <div className='my-3' id='separator'> ----------or ----------</div>
        <button className='btn btn-dark text-info border-info w-75 rounded-1' onClick={loginWithGoogle}><FaTwitter className='mx-2' />Login with twitter</button><br/>
        <button className='btn btn-dark text-info border-info w-75 rounded-1' onClick={() => redirect("/Signup")}>Create a new account ?</button><br />
      </div>
      <ToastContainer />
    </div>
  )
}

export default Index;
