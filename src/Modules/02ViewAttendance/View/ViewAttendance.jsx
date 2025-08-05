import React, { useState } from "react";
import '../../../CommonUtilities/tableLayout.css';
import '../Style/ViewAttendance.css';

export default function ViewAttendance() {
  const [employees, setEmployees] = useState([]);
  const [empId, setEmpId] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [message, setMessage] = useState('');

  // Fetch attendance by empId from /showAttendence/employee/{empId}
  const fetchByEmpId = async (id) => {
    const trimmedId = id.trim();
    if (!trimmedId) {
      setMessage('Please enter Employee ID.');
      setEmployees([]);
      return;
    }
    setMessage('Loading...');
    try {
      const res = await fetch(`http://localhost:8080/showAttendence/employee/${encodeURIComponent(trimmedId)}`);

      if (res.status === 204) {
        setEmployees([]);
        setMessage('No attendance found for given Employee ID.');
        return;
      }

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error ${res.status}: ${errorText || res.statusText}`);
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        console.warn('Expected an array but got:', data);
        setEmployees(data ? [data] : []);
        setMessage(data ? '' : 'No attendance found for given Employee ID.');
      } else {
        setEmployees(data);
        setMessage(data.length === 0 ? 'No attendance found for given Employee ID.' : '');
      }
    } catch (err) {
      console.error('Error fetching attendance by Employee ID:', err);
      setEmployees([]);
      setMessage('Failed to fetch data.');
    }
  };

  // Fetch all attendance data for date filtering
  const fetchAll = async () => {
    try {
      const res = await fetch('http://localhost:8080/showAttendence');
      if (!res.ok) throw new Error('Failed to fetch all attendances');
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Error fetching all data:", err);
      setEmployees([]);
      setMessage('Failed to fetch all data.');
      return [];
    }
  };

  // Filter by date (YYYY-MM-DD)
  const handleDateSearch = async () => {
    if (!searchDate.trim()) {
      setMessage('Please enter a date.');
      setEmployees([]);
      return;
    }
    setMessage('Loading...');
    const data = await fetchAll();

    const filtered = data.filter(emp => {
      if (!emp.clockInDate) return false;
      return emp.clockInDate.trim() === searchDate.trim();
    });

    setEmployees(filtered);
    setMessage(filtered.length === 0 ? 'No attendance found for given date.' : '');
  };

  // Filter employees by status (case-insensitive)
  const filteredEmployees = employees.filter(emp => {
    if (!statusFilter.trim()) return true; // no filter applied
    if (!emp.status) return false;
    return emp.status.toLowerCase() === statusFilter.trim().toLowerCase();
  });

  return (
    <div>
      <div className='searchFieldDiv'>
        <input
          placeholder='Enter Employee ID'
          value={empId}
          onChange={e => setEmpId(e.target.value)}
        />
        <div className='button' onClick={() => fetchByEmpId(empId)}>
          Search
        </div>
      </div>

      <div className='searchFieldDiv'>
        <input
          type="date"
          placeholder='Enter Date'
          value={searchDate}
          onChange={e => setSearchDate(e.target.value)}
        />
        <div className='button' onClick={handleDateSearch}>
          Search
        </div>
      </div>

      <div className='searchFieldDiv'>
        <input
          placeholder='Filter by Status'
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        />
      </div>

      <p className='dateTag'>
        {searchDate ? `Attendance of : ${searchDate}` : "Attendance"}
      </p>

      {message && <div style={{ marginBottom: '10px', color: 'red' }}>{message}</div>}

      <table className="tableStyle">
        <thead className='tableHead'>
          <tr>
            <td className='headData'>Attendance ID</td>
            <td className='headData'>Employee ID</td>
            <td className='headData'>Month</td>
            <td className='headData'>Year</td>
            <td className='headData'>Clock In Date</td>
            <td className='headData'>Status</td>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: 'center' }}>No Data.</td>
            </tr>
          ) : (
            filteredEmployees.map(empData => (
              <tr key={empData.attId}>
                <td className='empData'>{empData.attId}</td>
                <td className='empData'>{empData.empId}</td>
                <td className='empData'>{empData.month}</td>
                <td className='empData'>{empData.year}</td>
                <td className='empData'>{empData.clockInDate}</td>
                <td className='empData'>{empData.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
