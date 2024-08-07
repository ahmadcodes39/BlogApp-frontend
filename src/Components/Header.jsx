import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { logoutUser } from "../ApiRoutes/Api_Routes";
import { userContext } from "../UserContext/userContext";

axios.defaults.baseURL = "http://localhost:9090";
axios.defaults.withCredentials = true;

const Header = () => {
  const { userInfo, setUserInfo } = useContext(userContext);
  const navigate = useNavigate();

  const logoutFunction = async () => {
    await logoutUser(navigate, setUserInfo);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/auth/profile");
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []); 

  const captalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const name = userInfo?.name;

  return (
    <header>
      <div className="logo">
        <Link to="/"><span style={{color:'blueviolet'}}>{captalize(name ? name : 'My')}</span> Blogs</Link>
      </div>
      <nav>
        {name ? (
          <>
            <Link to="/createPost" className="newPost">Create New Post</Link>
            <a className="logout" onClick={logoutFunction}>Logout</a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

