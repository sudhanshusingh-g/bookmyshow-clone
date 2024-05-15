import React, { useState,useEffect } from "react";
import { loginUser } from "../../apis/users";

import { useNavigate, Link } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    setLoading(true);

    try {
      const response = await loginUser({ email, password });
      if (response && response.data.success) {
        setSuccess(true);
        console.log("Logged in");
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        console.error(
          "Login failed:",
          response?.data?.message || "Unknown error"
        );
        setError("Login failed. Please check your email and password.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="center">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in.." : "Login"}
        </button>
      </form>

      <p>
        Not registered? <Link to="/register">Register</Link> yourself
      </p>
    </div>
  );
}

export default Login;
