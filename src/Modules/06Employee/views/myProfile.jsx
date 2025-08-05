// src/Modules/06Employee/views/MyProfile.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function MyProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const employee = location.state?.employee;

  if (!employee) {
    return (
      <div className="text-center mt-5">
        <h4>No employee data found. Please login again.</h4>
        <button className="btn btn-warning mt-3" onClick={() => navigate('/EmployeeLogin')}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <h3 className="text-center mb-4">My Profile</h3>
        <div className="row">
          <div className="col-md-4 text-center">
            <img
              src="https://icons.veryicon.com/png/o/business/multi-color-financial-and-business-icons/user-139.png"
              alt="profile"
              className="rounded-circle"
              width="150"
              height="150"
            />
            <h5 className="mt-3">{employee.empName}</h5>
            <p className="text-muted">ID: {employee.empId}</p>
          </div>
          <div className="col-md-8">
            <h5>Contact Information</h5>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Phone:</strong> {employee.phone || 'N/A'}</p>
            <p><strong>Address:</strong> {employee.address || 'N/A'}</p>

            <h5 className="mt-3">Job Details</h5>
            <p><strong>Department:</strong> {employee.department}</p>
            <p><strong>Designation:</strong> {employee.designation}</p>
            <p><strong>Date of Joining:</strong> {employee.doj}</p>
            <p><strong>Salary (CTC):</strong> {employee.salary_ctc || 'N/A'}</p>

            <h5 className="mt-3">Personal Details</h5>
            <p><strong>Gender:</strong> {employee.gender}</p>
            <p><strong>Date of Birth:</strong> {employee.dob}</p>
            <p><strong>Nationality:</strong> {employee.nationality}</p>
            <p><strong>Aadhar:</strong> {employee.aadhar || 'N/A'}</p>
            <p><strong>PAN:</strong> {employee.pan || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
