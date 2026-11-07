import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleRegister = () => {
    
    if (username.trim() === "" || password === "" || confirmPassword === "") {
      setError("All fields are required");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

 
    localStorage.setItem("userName", username);
    localStorage.setItem("userPassword", password);
    localStorage.setItem("isAuth", "true");

    setError("");
    alert("Registration Successful! Welcome " + username);
    nav("/dashboard");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register Page</h2>

      <input 
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ display: "block", margin: "10px 0", padding: "8px", width: "300px" }}
      />

      <input 
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", margin: "10px 0", padding: "8px", width: "300px" }}
      />

      <input 
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={{ display: "block", margin: "10px 0", padding: "8px", width: "300px" }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button 
        onClick={handleRegister}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Register
      </button>

      <p style={{ marginTop: "20px" }}>
        Already have an account? 
        <button onClick={() => nav("/login")} style={{ marginLeft: "10px", color: "blue", background: "none", border: "none" }}>
          Go to Login
        </button>
      </p>
    </div>
  );
}

export default Register;