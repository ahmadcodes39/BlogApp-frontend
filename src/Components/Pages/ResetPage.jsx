import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ForgotPass } from "../../ApiRoutes/Api_Routes";
import resetPasswordImage from '../../assets/resetPassword.jfif';
import { ResetPassword } from "../../ApiRoutes/Api_Routes";

const ResetPage = () => {
  const [password, setPassword] = useState("");
  const handleChange = (e) => {
    setPassword(e.target.value);
  };
  const navigate = useNavigate();
const {id,token} = useParams()  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await ResetPassword(password,id,token,navigate);
  };
  return (
    <form className="main-Container" onSubmit={handleSubmit}>
      <div className="forgotPassword" >
        <img
          src={resetPasswordImage}
          alt=""
        />
        <h1>Reset Password</h1>
        <input
          type="password"
          name="password"
          placeholder="Enter New Password"
          required
          autoCorrect="off"
          autoComplete="off"
          autoFocus
          onChange={handleChange}
          value={password}
        />
        <button type="submit">Reset Password</button>
      </div>
    </form>
  );
};

export default ResetPage;
