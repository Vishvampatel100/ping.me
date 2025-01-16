import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Privateroute from './Components/Auth/contexts/Privateroute';
import './App.css';
import Success from './Components/Auth/Success';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Forgetpassword from './Components/Auth/Forgetpassword';
import Updateprofile from './Components/Auth/Updateprofile';
import { AuthProvider } from './Components/Auth/contexts/AuthContext';

function App() {
  return (
    <div className='centered-container'>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route exact path="/" element={
                <Privateroute>
                  <Success />
                </Privateroute>
              } />
              <Route exact path="/updateprofile" element={
                <Privateroute>
                  <Updateprofile />
                </Privateroute>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/forgetpassword" element={<Forgetpassword />} />
            </Routes>
          </AuthProvider>
        </Router>
    </div>
  );
}

export default App;

