import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login, isAuth } = useAuth();
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("1234");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) login(email, password);
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  return (
    <div className="loginContainer form">
      <h2>Login</h2>
      <form className="formControl" onSubmit={(e) => handleLogin(e)}>
        <div className="formControl">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn--primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
