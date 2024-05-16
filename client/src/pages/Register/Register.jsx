import React, { useState, useEffect } from "react";
import "./Register.scss";
import { useNavigate,Link } from "react-router-dom";
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
    <div className="h-[100vh] flex items-center justify-center">
      <div>
        <h1 className="text-2xl text-center my-2">Register</h1>
        {success && (
          <p className="success-message">
            Registration successful! Redirecting...
          </p>
        )}
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-sm">Name</label>
            <input
              className="p-2 border-2 rounded outline-none"
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
          <div className="flex flex-col my-4">
            <label className="text-sm">Email</label>
            <input
              className="p-2 border-2 rounded outline-none"
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-sm">Password</label>
            <input
              className="p-2 border-2 rounded outline-none"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button
            className="bg-slate-700 text-white p-2 w-full rounded hover:bg-slate-900"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="mt-4">
          Already registered?{" "}
          <Link
            to="/login"
            className="cursor-pointer text-blue-700 underline"
          >
            Login
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default Register;
