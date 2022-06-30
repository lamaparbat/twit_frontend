import React from 'react';
import Dashboard from './Component/Dashboard/index';
import Login from './Component/Login/index';
import Signup from './Component/Signup/index';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
