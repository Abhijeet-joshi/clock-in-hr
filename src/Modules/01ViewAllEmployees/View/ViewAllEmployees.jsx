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

    useEffect(() => { 
        const fetchEmployees = async () => {
            try {
                const username = "user"; // 🔐 Replace with actual username
                const password = "17560f3c-bf17-4a6d-888a-b61826f4e74d"; // 🔐 Replace with actual password
                const credentials = btoa(`${username}:${password}`);

                const response = await fetch('http://localhost:8080/employees', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${credentials}`,
                    },
                    credentials: 'include' // Only if backend allows credentials
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setEmployees(data);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    if (loading) return <div className="statusMessage">Loading employees...</div>;
    if (error) return <div className="statusMessage error">Error: {error}</div>;

    return (
        <div className="viewContainer">
            <div className="appBar">All Employees</div>

            <table className="tableStyle">
                <thead className="tableHead">
                    <tr>
                        <th className="headData">ID</th>
                        <th className="headData">Name</th>
                        <th className="headData">Department</th>
                        <th className="headData">Designation</th>
                        <th className="headData">Email</th>
                        <th className="headData">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.empId}>
                            <td className="empData">{emp["empId"]}</td>
                            <td className="empData">{emp["empId"]}</td>
                            <td className="empData">{emp["empId"]}</td>
                            <td className="empData">{emp["empId"]}</td>
                            <td className="empData">{emp["empId"]}</td>
                            <td className="highlightedData">
                                <button
                                    className="actionButton"
                                    onClick={() => navigate(`/ViewEmployee/${emp.empId}`)}
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