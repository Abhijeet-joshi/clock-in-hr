// src/Modules/06Employee/views/EmployeeDetails.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const HRDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const empId = location.state?.user;

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!empId) {
      setError("No employee ID found. Please go back and select an employee.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8080/getEmp/${empId.empId}`)
      .then((res) => {
        setEmployee(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching employee details.");
        setLoading(false);
      });
  }, [empId]);

  if (loading) {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading…</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex vh-100 flex-column justify-content-center align-items-center bg-light">
        <div className="alert alert-danger text-center" style={{ maxWidth: 400 }}>
          {error}
        </div>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  if (!employee) return null;

  // Formatting utility
  function formatDate(date) {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-IN");
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4" style={{ maxWidth: 750, margin: "auto" }}>
        <div className="d-flex align-items-center mb-4">
          <img
            src="https://icons.veryicon.com/png/o/business/multi-color-financial-and-business-icons/user-139.png"
            alt="profile"
            className="rounded-circle shadow"
            width="90"
            height="90"
            style={{ background: "#feca57", padding: 6, marginRight: 24 }}
          />
          <div>
            <h3 className="mb-0">{employee.empName}</h3>
            <small className="text-muted">Employee ID: <b>{employee.empId}</b></small>
            <div className="text-muted">{employee.designation} - {employee.department}</div>
          </div>
        </div>
        <hr />

        <div className="row mb-3">
          <div className="col-md-6">
            <h5 className="text-warning">Personal Details</h5>
            <ul className="list-group list-group-flush mb-3">
              <li className="list-group-item bg-light">
                <b>Date of Birth:</b> {employee.dob}
              </li>
              <li className="list-group-item bg-light">
                <b>Gender:</b> {employee.gender || "N/A"}
              </li>
              <li className="list-group-item bg-light">
                <b>Nationality:</b> {employee.nationality || "N/A"}
              </li>
            </ul>
          </div>
          <div className="col-md-6">
            <h5 className="text-warning">Job Details</h5>
            <ul className="list-group list-group-flush mb-3">
              <li className="list-group-item bg-light">
                <b>Department:</b> {employee.department}
              </li>
              <li className="list-group-item bg-light">
                <b>Designation:</b> {employee.designation}
              </li>
              <li className="list-group-item bg-light">
                <b>Date of Joining:</b> {formatDate(employee.doj)}
              </li>
              <li className="list-group-item bg-light">
                <b>Salary (CTC):</b> ₹{employee.salaryCtc?.toLocaleString() || "N/A"}
              </li>
            </ul>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <h5 className="text-warning">Contact</h5>
            <ul className="list-group list-group-flush mb-3">
              <li className="list-group-item bg-light">
                <b>Email:</b> {employee.email}
              </li>
              <li className="list-group-item bg-light">
                <b>Phone:</b> {employee.phone || "N/A"}
              </li>
              <li className="list-group-item bg-light">
                <b>Address:</b> {employee.address || "N/A"}
              </li>
            </ul>
          </div>
          <div className="col-md-6">
            <h5 className="text-warning">IDs</h5>
            <ul className="list-group list-group-flush mb-3">
              <li className="list-group-item bg-light">
                <b>Aadhar:</b> {employee.aadhar || "N/A"}
              </li>
              <li className="list-group-item bg-light">
                <b>PAN:</b> {employee.pan || "N/A"}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRDetails;
