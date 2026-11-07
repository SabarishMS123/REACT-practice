import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const nav = useNavigate();
  const username = localStorage.getItem("userName") || "User";

  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    nav("/login");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Welcome to Dashboard</h2>
      <h3>Hello, {username} 👋</h3>

      <div style={{ background: "#e8f4fd", padding: "20px", borderRadius: "10px", margin: "20px 0" }}>
        <h4>Your Profile</h4>
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Account Status:</strong> <span style={{ color: "green" }}>Active</span></p>
        <p><strong>Member Since:</strong> January 2026</p>
      </div>

      <button 
        onClick={handleLogout}
        style={{ padding: "12px 24px", background: "#ff4444", color: "white", border: "none", fontSize: "16px", borderRadius: "5px" }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;