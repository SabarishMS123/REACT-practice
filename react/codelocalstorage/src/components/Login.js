import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleLogin = () => {
    const savedUser = localStorage.getItem("userName");
    const savedPass = localStorage.getItem("userPassword");

    if (username === savedUser && password === savedPass) {
      localStorage.setItem("isAuth", "true");
      setError("");
      nav("/dashboard");
    } else {
      setError("Wrong username or password");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login Page</h2>

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

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button 
        onClick={handleLogin}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Login
      </button>

      <p style={{ marginTop: "20px" }}>
        New user? 
        <button onClick={() => nav("/register")} style={{ marginLeft: "10px", color: "blue", background: "none", border: "none" }}>
          Register here
        </button>
      </p>
    </div>
  );
}

export default Login;