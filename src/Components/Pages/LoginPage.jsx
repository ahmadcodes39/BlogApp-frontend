import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserLogin } from "../../ApiRoutes/Api_Routes";
import { useNavigate } from 'react-router-dom';
import { userContext } from "../../UserContext/userContext";
import { useContext } from "react";

const LoginPage = () => {
  
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const navigate  = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((preVal) => ({
      ...preVal,
      [name]: value,
    }));
  };
  const {setUserInfo} = useContext(userContext);
  const handleSubmit = async (e) => {
    e.preventDefault();

    await UserLogin(formData,setUserInfo,navigate);
  };

  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="loginForm">
          <div className="navigatePage">
            <h1>BlogSphere</h1>
            <p>Start Bloging Today!</p>
            <button> <Link to="/register" style={{color:'white',textDecoration:'none'}}>Register</Link></button>
          </div>
          <div className="loginInfo">
            <h1>BlogSphere</h1>
            <input
              type="email"
              name="email"
              placeholder="Enter your E-mail"
              required
              autoCorrect="off"
              autoComplete="off"
              onChange={handleChange}
              value={formData.email}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              required
              autoCorrect="off"
              onChange={handleChange}
              value={formData.password}
            />

            <button type="submit">Login</button>
            <Link to="/forgotPassword" className="forgotpasLink">
              Forgot Password
            </Link>
            <p>
              No Account ?
              <Link to="/register" className="registerLink">
                {" "}
                Register
              </Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
