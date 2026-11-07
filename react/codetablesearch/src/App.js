import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
 const [students, setStudents] = useState([
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

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleStatusChange = (id, newStatus) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, status: newStatus } : student
      )
    );
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || student.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container my-5">
      <h2 className="mb-4">Student Management</h2>

      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Deactive">Deactive</option>
          </select>
        </div>
      </div>

     
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.course}</td>
                <td>
                  <select
                    className={`form-select form-select-sm ${
                      student.status === "Active" ? "bg-success text-white" : "bg-danger text-white"
                    }`}
                    value={student.status}
                    onChange={(e) => handleStatusChange(student.id, e.target.value)}
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

      {filteredStudents.length === 0 && (
        <div className="alert alert-info text-center">
          No students found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default App;