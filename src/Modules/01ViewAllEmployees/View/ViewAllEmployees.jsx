import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/ViewEmployees.css';
import '../../../CommonUtilities/tableLayout.css';
import '../../../CommonUtilities/commonStyles.css';

export default function ViewAllEmployees() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch employee data from backend
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:8080/employees');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setEmployees(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    // Render loading or error state
    if (loading) return <div className="statusMessage">Loading employees...</div>;
    if (error) return <div className="statusMessage error">Error: {error}</div>;

    return (
        <div className="viewContainer">
            <div className="appBar">All Employees</div>

            <table className="tableStyle">
                <thead className="tableHead">
                    <tr>
                        <td className="headData">ID</td>
                        <td className="headData">Name</td>
                        <td className="headData">Department</td>
                        <td className="headData">Designation</td>
                        <td className="headData">Email</td>
                        <td className="headData">Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.empId}>
                            <td className="empData">{emp["empId"]}</td>
                            <td className="empData">{emp["empName"]}</td>
                            <td className="empData">{emp["department"]}</td>
                            <td className="empData">{emp["designation"]}</td>
                            <td className="empData">{emp["email"]}</td>
                            <td className="highlightedData">
                                <button
                                    className="actionButton"
                                    onClick={() => navigate(`/ViewEmployee`)}
                                >
                                    View Employee
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                className="fab"
                title="Add Employee"
                onClick={() => navigate('/AddEmployee')}
            >
                +
            </button>
        </div>
    );
}