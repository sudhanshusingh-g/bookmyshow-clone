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
    <div className="h-[100vh] flex items-center justify-center">
      <div>
        <h1 className="text-2xl text-center my-2">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-sm">Email</label>
            <input
              className="p-2 border-2 rounded outline-none"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="flex flex-col my-4">
            <label className="text-sm">Password</label>
            <input
              className="p-2 border-2 rounded outline-none"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button className="bg-slate-700 text-white p-2 w-full rounded hover:bg-slate-900" type="submit" disabled={loading}>
            {loading ? "Logging in.." : "Login"}
          </button>
        </form>
        <p className="mt-4">
          Not registered?{" "}
          <Link to="/register" className="cursor-pointer text-blue-700 underline">
            Register
          </Link>{" "}
          
        </p>
      </div>
    </div>
  );
}

export default Login;
