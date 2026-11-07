import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const nav = useNavigate();
  const [n, setN] = useState("");
  const [a, setA] = useState("");
  const [p, setP] = useState("");
  const [c, setC] = useState("");
  const [m, setM] = useState("");
  const [t, setT] = useState("");

  const [g, setG] = useState(() => {
    const s = localStorage.getItem("g");
    return s ? JSON.parse(s) : false;
  });

  useEffect(() => {
    localStorage.setItem("g", JSON.stringify(g));
  }, [g]);

  const tg = () => setG(v => !v);

  function reg() {
    if (!n || !a || !p || !c) {
      setM("All fields are required!");
      setT("danger");
    } else if (p !== c) {
      setM("Passwords do not match!");
      setT("danger");
    } else {
      setM("Registered successfully!!");
      setT("success");
    }
  }

  const back = () => nav("/");
  const login = () => setTimeout(() => nav("/login"), 2000);

  const bg = g ? "bg-success-subtle text-dark" : "bg-primary text-white";
  const tb = g ? "btn-outline-dark" : "btn-outline-light";
  const cb = g ? "bg-white" : "bg-dark";
  const tx = g ? "text-dark" : "text-white";
  const ib = g ? "" : "bg-secondary text-white border-0";

  const regBtn = g ? "btn-dark text-white" : "btn-light";
  const loginBtn = g ? "btn-outline-dark" : "btn-outline-light";

  return (
    <div className={`min-vh-100 d-flex align-items-center justify-content-center ${bg} position-relative`}>
      <button onClick={tg} className={`position-absolute top-0 end-0 m-4 btn btn-lg shadow-sm ${tb}`}>
        {g ? "🌙" : "☀️"}
      </button>

      <div className={`card shadow-lg ${cb}`} style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body p-5">
          <h2 className={`card-title text-center mb-4 fw-bold ${g ? "text-primary" : "text-light"}`}>
            Register
          </h2>

          {m && (
            <div className={`alert alert-${t} alert-dismissible fade show`} role="alert">
              {m}
              <button type="button" className="btn-close" onClick={() => setM("")} aria-label="Close"></button>
            </div>
          )}

          <form onSubmit={e => { e.preventDefault(); reg(); }}>
            <div className="mb-3">
              <label htmlFor="name" className={`form-label fw-medium ${tx}`}>Full Name</label>
              <input
                type="text"
                className={`form-control ${ib}`}
                id="name"
                placeholder="Enter your name"
                value={n}
                onChange={e => setN(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className={`form-label fw-medium ${tx}`}>Address</label>
              <input
                type="text"
                className={`form-control ${ib}`}
                id="address"
                placeholder="Enter your address"
                value={a}
                onChange={e => setA(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className={`form-label fw-medium ${tx}`}>Password</label>
              <input
                type="password"
                className={`form-control ${ib}`}
                id="password"
                placeholder="Enter password"
                value={p}
                onChange={e => setP(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className={`form-label fw-medium ${tx}`}>Confirm Password</label>
              <input
                type="password"
                className={`form-control ${ib}`}
                id="confirmPassword"
                placeholder="Confirm password"
                value={c}
                onChange={e => setC(e.target.value)}
                required
              />
            </div>

            <div className="d-grid gap-3 d-sm-flex justify-content-center mb-3">
              <button type="submit" className={`btn btn-lg px-5 shadow-sm ${regBtn}`}>
                Register
              </button>
              <button type="button" className={`btn btn-lg px-5 shadow-sm ${loginBtn}`} onClick={login}>
                Login
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
};

export default Registration;