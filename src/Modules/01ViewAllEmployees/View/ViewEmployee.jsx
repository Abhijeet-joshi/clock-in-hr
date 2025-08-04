import React from 'react';
import { useLocation } from 'react-router-dom';

function EmployeeDetails() {
    const location = useLocation();
    const employee = location.state?.employee;

    // If user navigates directly without state, show error!
    if (!employee) {
        return <div className="statusMessage error">No employee data found.</div>;
    }

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
                                    src='https://icons.veryicon.com/png/o/business/multi-color-financial-and-business-icons/user-139.png'
                                    alt="Profile"
                                    className="rounded-circle mb-3"
                                    width="120"
                                    height="120"
                                />
                                <h4 className="mb-1">{employee.empName || employee.emp_name}</h4>
                                <p className="text-muted">Employee ID: {employee.empId || employee.emp_id}</p>
                            </div>

                            {/* Sections */}
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <h5 className="text-primary">Contact Information</h5>
                                    <hr />
                                    <p><strong>Email:</strong> {employee.email}</p>
                                    <p><strong>Phone:</strong> {employee.phone || 'N/A'}</p>
                                    <p><strong>Address:</strong> {employee.address || 'N/A'}</p>
                                </div>

                                <div className="col-md-6 mb-4">
                                    <h5 className="text-primary">Personal Details</h5>
                                    <hr />
                                    <p><strong>Gender:</strong> {employee.gender || 'N/A'}</p>
                                    <p><strong>Date of Birth:</strong> {employee.dob || 'N/A'}</p>
                                    <p><strong>Nationality:</strong> {employee.nationality || 'N/A'}</p>
                                    <p><strong>Aadhar:</strong> {employee.aadhar || 'N/A'}</p>
                                    <p><strong>PAN:</strong> {employee.pan || 'N/A'}</p>
                                </div>

                                <div className="col-md-6 mb-4">
                                    <h5 className="text-primary">Job Information</h5>
                                    <hr />
                                    <p><strong>Department:</strong> {employee.department}</p>
                                    <p><strong>Designation:</strong> {employee.designation}</p>
                                    <p><strong>Date of Joining:</strong> {employee.doj || 'N/A'}</p>
                                    <p><strong>Salary (CTC):</strong> {employee.salary_ctc || 'N/A'}</p>
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
