import React, { useState, useEffect } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../apis/users";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate=useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

 const handleSubmit = async (e) => {
   e.preventDefault(); // Prevent default form submission behavior
   setLoading(true);
   setError(null);
   setName('');
   setEmail('');
   setPassword('');

   try {
     const response = await registerUser({ name, email, password });
     if (response) {
       setSuccess(true);
     } else {
       console.error("Registration failed: Response is undefined");
       setError("Registration failed. Please try again later.");
     }
   } catch (error) {
     console.error("Registration failed:", error);
     setError("Registration failed. Please try again later.");
   } finally {
     setLoading(false);
   }
 };

  useEffect(() => {
    // Clear success message after 3 seconds
    const timer = setTimeout(() => {
      setSuccess(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [success]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="center">
      <h1>Register</h1>
      {success && (
        <p className="success-message">
          Registration successful! Redirecting...
        </p>
      )}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;
