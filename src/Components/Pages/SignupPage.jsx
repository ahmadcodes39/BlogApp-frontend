import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserRegister } from "../../ApiRoutes/Api_Routes";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((preVal) => ({
      ...preVal,
      [name]: value,
    }));
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    await UserRegister(formData,navigate)
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="loginForm">
          <div className=" navigatePage navigatePage-Signup">
            <h1>BlogSphere</h1>
            <p>Start Bloging Today!</p>
            {/* <Link to='/login' className="navigatePage-Signup-btn"><button>Login</button></Link> */}
            <button><Link to='/login' style={{color:'white',textDecoration:'none'}}>Login</Link> </button>
          </div>
          <div className="loginInfo loginInfo-Signup">
            <h1>BlogSphere</h1>
            <input
              type="text"
              name="name"
              placeholder="Enter your Name"
              required
              autoCorrect="off"
              autoComplete="off"
              onChange={handleChange}
              value={formData.name}
            />
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
            <p style={{textAlign:'left',marginBottom:'0px'}}>Password Length should be up to 5 characters</p>
            <button type="submit" style={{marginTop:'25px'}}>Register</button>
            <p>
              Already have an Account ?
              <Link to="/login" className="registerLink">
                Login
              </Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignupPage;
