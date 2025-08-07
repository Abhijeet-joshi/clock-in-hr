import { useNavigate } from 'react-router-dom';
import '../Style/ViewEmployees.css';
import '../../../CommonUtilities/tableLayout.css';
import '../../../CommonUtilities/commonStyles.css';
import { useState, useEffect } from 'react';

export default function ViewAllEmployees() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:8080/showEmp', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
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

    // Filter employees based on searchTerm (case insensitive)
    const filteredEmployees = employees.filter(emp =>
        emp.empId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="statusMessage">Loading employees...</div>;
    if (error) return <div className="statusMessage error">Error: {error}</div>;

    return (
        <div className="viewContainer">
            <div className='searchFieldDiv'>
                <input
                    type="text"
                    placeholder='Enter Employee ID'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>

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
                    {filteredEmployees.length > 0 ? (
                        filteredEmployees.map((emp) => (
                            <tr key={emp.empId}>
                                <td className="empData">{emp.empId}</td>
                                <td className="empData">{emp.empName}</td>
                                <td className="empData">{emp.department}</td>
                                <td className="empData">{emp.designation}</td>
                                <td className="empData">{emp.email}</td>
                                <td className="highlightedData">
                                    <button
  style={{
    backgroundColor: '#feca57',
    color: '#000', // black text for good contrast
    border: 'none',
    borderRadius: '4px',
    padding: '6px 16px',
    margin: '3px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
  }}
  onClick={() => navigate('/ViewEmployee', { state: { employee: emp } })}
>
  View Employee
</button>

                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan={6} style={{ textAlign: 'center' }}>No employees found</td></tr>
                    )}
                </tbody>
            </table>

            <button
                className="fab"
                title="Add Employee"
                onClick={() => navigate('/AddNewEmployee')}
            >
                +
            </button>
        </div>
    );
}
