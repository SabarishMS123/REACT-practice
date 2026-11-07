import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const nav = useNavigate();

  const [s, setS] = useState([
    { id: 1, name: "Saboo", email: "saboo@gmail.com", course: "Math", status: "Active" },
    { id: 2, name: "Kasthuri", email: "kasthuri@gmail.com", course: "Science", status: "Deactive" },
    { id: 3, name: "Sakthi", email: "sakthi123@gmail.com", course: "Social Science", status: "Active" },
    { id: 4, name: "Bhanupriya", email: "bhanu1234@gmail.com", course: "Social Science", status: "Deactive" },
    { id: 5, name: "Arjun", email: "arjun.k@gmail.com", course: "Computer Science", status: "Active" },
    { id: 6, name: "Priya", email: "priya95@yahoo.com", course: "English", status: "Active" },
    { id: 7, name: "Vikram", email: "vikram88@hotmail.com", course: "Physics", status: "Deactive" },
    { id: 8, name: "Meera", email: "meera.nair@gmail.com", course: "Biology", status: "Active" },
    { id: 9, name: "Rohan", email: "rohan.sharma@gmail.com", course: "Math", status: "Active" },
    { id: 10, name: "Ananya", email: "ananya.reddy@gmail.com", course: "Chemistry", status: "Deactive" }
  ]);

  const [q, setQ] = useState("");
  const [f, setF] = useState("All");

  const [g, setG] = useState(() => {
    const v = localStorage.getItem("g");
    return v ? JSON.parse(v) : false;
  });

  useEffect(() => {
    localStorage.setItem("g", JSON.stringify(g));
  }, [g]);

  const tg = () => setG(v => !v);

  const out = () => nav("/");

  const ch = (id, ns) => {
    setS(p => p.map(st => st.id === id ? { ...st, status: ns } : st));
  };

  const fs = s.filter(st => {
    const ms = st.name.toLowerCase().includes(q.toLowerCase()) ||
               st.email.toLowerCase().includes(q.toLowerCase());
    const mf = f === "All" || st.status === f;
    return ms && mf;
  });

  // g = false → Blue mode (bg-primary) → text should be DARK (black)
  // g = true  → Green mode (bg-success-subtle) → text white not needed, already dark bg
  const bg = g ? "bg-success-subtle text-dark min-vh-100" : "bg-primary text-dark min-vh-100";
  const tb = g ? "btn-outline-dark" : "btn-outline-light";
  const tx = "text-dark"; // Always dark text for good contrast in both modes
  const hd = g ? "table-light" : "table-primary";
  const stActive = "bg-success text-white";
  const stDeactive = "bg-danger text-white";
  const inBg = g ? "" : "bg-light text-dark border";
  const logoutBtn = g ? "btn-dark text-white" : "btn-light text-dark";

  return (
    <div className={`d-flex flex-column ${bg} position-relative`}>
      <button onClick={tg} className={`position-absolute top-0 end-0 m-4 btn btn-lg shadow-sm ${tb}`}>
        {g ? "🌙" : "☀️"}
      </button>

      <div className="container my-5 flex-grow-1">
        <h2 className={`mb-4 text-center fw-bold ${tx}`}>Student Management</h2>

        <div className="row mb-4">
          <div className="col-md-6">
            <input
              type="text"
              className={`form-control ${inBg}`}
              placeholder="Search by name or email..."
              value={q}
              onChange={e => setQ(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <select
              className={`form-select ${inBg}`}
              value={f}
              onChange={e => setF(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Deactive">Deactive</option>
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className={hd}>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {fs.map(st => (
                <tr key={st.id}>
                  <td className={tx}>{st.id}</td>
                  <td className={tx}>{st.name}</td>
                  <td className={tx}>{st.email}</td>
                  <td className={tx}>{st.course}</td>
                  <td>
                    <select
                      className={`form-select form-select-sm ${
                        st.status === "Active" ? stActive : stDeactive
                      }`}
                      value={st.status}
                      onChange={e => ch(st.id, e.target.value)}
                    >
                      <option value="Active">Active</option>
                      <option value="Deactive">Deactive</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {fs.length === 0 && (
          <div className="alert alert-info text-center">
            No students found matching your criteria.
          </div>
        )}

        <div className="text-center mt-4">
          <button onClick={out} className={`btn btn-lg px-5 shadow-sm ${logoutBtn}`}>
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;