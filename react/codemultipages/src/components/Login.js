import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [e, setE] = useState("");
  const [p, setP] = useState("");
  const [m, setM] = useState("");
  const [t, setT] = useState("");

  const [g, setG] = useState(() => {
    const s = localStorage.getItem("g");
    return s ? JSON.parse(s) : false;
  });

  const nav = useNavigate();

  useEffect(() => {
    localStorage.setItem("g", JSON.stringify(g));
  }, [g]);

  const tg = () => setG(v => !v);

  const back = () => nav("/");

  const sub = () => {
    if (!e || !p) {
      setM("Please enter both email and password");
      setT("danger");
    } else if (p.length < 8) {
      setM("Password must be at least 8 characters long");
      setT("danger");
    } else {
      setM("Login successful! Redirecting...");
      setT("success");
      setTimeout(() => nav("/dashboard"), 1000);
    }
  };

  const bg = g ? "bg-success-subtle text-dark" : "bg-primary text-white";
  const tb = g ? "btn-outline-dark" : "btn-outline-light";
  const cb = g ? "bg-white" : "bg-dark";
  const tx = g ? "text-dark" : "text-white";
  const ib = g ? "" : "bg-secondary text-white border-0";

  const loginBtn = g ? "btn-dark text-white" : "btn-light";
  const regBtn = g ? "btn-outline-dark" : "btn-outline-light";

  return (
    <div className={`min-vh-100 d-flex align-items-center justify-content-center ${bg} position-relative`}>
      <button onClick={tg} className={`position-absolute top-0 end-0 m-4 btn btn-lg shadow-sm ${tb}`}>
        {g ? "🌙" : "☀️"}
      </button>

      <div className={`card shadow-lg ${cb}`} style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body p-5">
          <h2 className={`card-title text-center mb-4 fw-bold ${g ? "text-primary" : "text-light"}`}>
            Login
          </h2>

          {m && (
            <div className={`alert alert-${t} alert-dismissible fade show`} role="alert">
              {m}
              <button type="button" className="btn-close" onClick={() => setM("")} aria-label="Close"></button>
            </div>
          )}

          <form onSubmit={ev => { ev.preventDefault(); sub(); }}>
            <div className="mb-3">
              <label htmlFor="email" className={`form-label fw-medium ${tx}`}>Email Address</label>
              <input
                type="email"
                className={`form-control ${ib}`}
                id="email"
                placeholder="Enter your email"
                value={e}
                onChange={ev => setE(ev.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className={`form-label fw-medium ${tx}`}>Password</label>
              <input
                type="password"
                className={`form-control ${ib}`}
                id="password"
                placeholder="Enter your password"
                value={p}
                onChange={ev => setP(ev.target.value)}
                required
              />
            </div>

            <div className="d-grid gap-3 d-sm-flex justify-content-center mb-3">
              <button type="submit" className={`btn btn-lg px-5 shadow-sm ${loginBtn}`}>
                Login
              </button>
              <button type="button" className={`btn btn-lg px-5 shadow-sm ${regBtn}`} onClick={() => nav("/registration")}>
                Register
              </button>
            </div>

            <div className="text-center">
              <button type="button" className={`btn ${g ? "btn-outline-secondary" : "btn-outline-light"}`} onClick={back}>
                Back to Home
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;