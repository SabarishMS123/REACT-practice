import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [isgreenTheme, setisGreen] = useState(false);

  const toggleTheme = () => {
    setisGreen(prev => !prev);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  
  const bgClass = isgreenTheme 
    ? 'bg-success-subtle text-dark'  
    : 'bg-primary text-white';       

  return (
    
      <div className={`min-vh-100 d-flex align-items-center justify-content-center ${bgClass} position-relative`}>
 
        <button
          onClick={toggleTheme} className={`position-absolute top-0 end-0 m-4 btn btn-lg shadow-sm ${
          isgreenTheme ? 'btn-outline-dark'  : 'btn-outline-light'}`}> 
          {isgreenTheme ? '🌙' : '☀️'}
          </button>    
             
          <div className="text-center px-4">
          <h1 className="display-4 fw-bold mb-4">Welcome to Our Company</h1> 
            
          <p className="lead mb-5 opacity-90">
            Join us today and explore amazing features designed just for you.
          </p>

          <div className="d-grid gap-3 d-sm-flex justify-content-center">
            <button
              onClick={handleLogin}
              className={`btn btn-lg px-5 shadow-sm ${
                isgreenTheme 
                  ? 'btn-dark text-white' 
                  : 'btn-light'
              }`}
            >
              Login
            </button>
            
            <button  onClick={handleRegister}
              className={`btn btn-lg px-5 shadow-sm ${   isgreenTheme ? 'btn-outline-dark' 
                                                                         : 'btn-outline-light'}`}>
                 
                  Register
              
           </button>
          </div>

          <p className={`mt-5 small ${isgreenTheme ? 'text-dark' : 'text-white-50'}`}>
            © 2026 XYZCompany. All rights reserved.
          </p>
        </div>
      </div>
    
  );
};

export default Home;