import React from 'react';

function EmployeeDetails() {
  const employee = {
    profileImage: 'https://www.njwebnest.in/images/is-mark-zuckerberg.jpg',
    emp_name: 'Mark Zuckerberg',
    emp_id: 'EMP001',
    email: 'mark.zuckerberg@cdac.com',
    phone: '+91-9876543210',
    gender: 'Male',
    dob: '1990-01-01',
    doj: '2020-06-15',
    address: '123 Main Street, Pune, MH',
    department: 'Engineering',
    designation: 'Software Developer',
    aadhar: '1234-5678-9012',
    pan: 'ABCDE1234F',
    nationality: 'Indian',
    salary_ctc: '₹50,000'
  };

  return (
    <div className="bg-light min-vh-100">
      {/* AppBar */}
      <nav className="navbar navbar-light" style={{ backgroundColor: '#feca57' }}>
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1" style={{ color: '#222f3e', fontWeight: 'bold' }}>
            Employee Details
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-11 col-md-12">
            <div className="card shadow-sm p-4">
              {/* Profile Section */}
              <div className="text-center mb-4">
                <img
                  src={employee.profileImage}
                  alt="Profile"
                  className="rounded-circle mb-3"
                  width="120"
                  height="120"
                />
                <h4 className="mb-1">{employee.emp_name}</h4>
                <p className="text-muted">Employee ID: {employee.emp_id}</p>
              </div>

              {/* Sections */}
              <div className="row">
                <div className="col-md-6 mb-4">
                  <h5 className="text-primary">Contact Information</h5>
                  <hr />
                  <p><strong>Email:</strong> {employee.email}</p>
                  <p><strong>Phone:</strong> {employee.phone}</p>
                  <p><strong>Address:</strong> {employee.address}</p>
                </div>

                <div className="col-md-6 mb-4">
                  <h5 className="text-primary">Personal Details</h5>
                  <hr />
                  <p><strong>Gender:</strong> {employee.gender}</p>
                  <p><strong>Date of Birth:</strong> {employee.dob}</p>
                  <p><strong>Nationality:</strong> {employee.nationality}</p>
                  <p><strong>Aadhar:</strong> {employee.aadhar}</p>
                  <p><strong>PAN:</strong> {employee.pan}</p>
                </div>

                <div className="col-md-6 mb-4">
                  <h5 className="text-primary">Job Information</h5>
                  <hr />
                  <p><strong>Department:</strong> {employee.department}</p>
                  <p><strong>Designation:</strong> {employee.designation}</p>
                  <p><strong>Date of Joining:</strong> {employee.doj}</p>
                  <p><strong>Salary (CTC):</strong> {employee.salary_ctc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;