import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ForgotPass } from "../../ApiRoutes/Api_Routes";
const ForgotPage = () => {
  const [email, setEmail] = useState("");
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await ForgotPass(email,navigate);
  };
  return (
    <form className="main-Container" onSubmit={handleSubmit}>
      <div className="forgotPassword">
        <img
          src="https://png.pngtree.com/png-clipart/20230118/original/pngtree-reset-password-to-gain-more-secure-account-png-image_8920326.png"
          alt=""
        />
        <h1>Forgot Password</h1>
        <input
          type="email"
          name="email"
          placeholder="Enter your E-mail"
          required
          autoCorrect="off"
          autoComplete="off"
          autoFocus
          onChange={handleChange}
          value={email}
        />
        <button type="submit">Send</button>
      </div>
    </form>
  );
};

export default ForgotPage;
