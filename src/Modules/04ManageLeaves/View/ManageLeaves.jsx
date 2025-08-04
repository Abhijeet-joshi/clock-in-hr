import React, { useState, useEffect } from 'react';
import '../../../CommonUtilities/tableLayout.css';

export default function Page4() {
  const [allRequests, setAllRequests] = useState([]);
  const [searchEmpId, setSearchEmpId] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [message, setMessage] = useState('');
  const [displayDate, setDisplayDate] = useState('26/07/2025');

  // Fetch all leaves on component mount
  useEffect(() => {
    fetchLeaves();
  }, []);

  // Fetch all leaves from /showLeaves
  const fetchLeaves = async () => {
    setMessage('Loading...');
    try {
      const res = await fetch('http://localhost:8080/showLeaves');
      if (!res.ok) throw new Error('Failed to fetch leaves.');
      const data = await res.json();
      setAllRequests(data);
      setMessage('');
    } catch (err) {
      setAllRequests([]);
      setMessage('Error fetching leaves.');
    }
  };

  // Fetch leaves by empId
  const fetchLeavesByEmpId = async (empId) => {
    if (!empId.trim()) {
      setMessage('Please enter Employee ID.');
      return;
    }
    setMessage('Loading...');
    try {
      const res = await fetch(`http://localhost:8080/leaves/${empId.trim()}`);
      if (!res.ok) {
        if (res.status === 204) {
          setAllRequests([]);
          setMessage('No leaves found for given Employee ID.');
          return;
        }
        throw new Error('Failed to fetch leaves by Employee ID.');
      }
      const data = await res.json();
      setAllRequests(Array.isArray(data) ? data : [data]);
      setMessage('');
    } catch (err) {
      setAllRequests([]);
      setMessage('Error fetching leaves by Employee ID.');
    }
  };

  // Handle search by date (client-side filtering)
  const handleDateSearch = () => {
    if (!searchDate.trim()) {
      setMessage('Please enter a date.');
      return;
    }
    setMessage('');
    // Convert allRequests leaveDate to DD/MM/YYYY for comparison
    const filtered = allRequests.filter((req) => {
      if (!req.leaveDate) return false;
      // Parse leaveDate assuming ISO string, convert to DD/MM/YYYY string
      const dateObj = new Date(req.leaveDate);
      const day = String(dateObj.getDate()).padStart(2, '0');
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const year = dateObj.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      return formattedDate === searchDate.trim();
    });
    setAllRequests(filtered);
    setDisplayDate(searchDate.trim());
    if (filtered.length === 0) setMessage('No leaves found for given date.');
  };

  return (
    <div>

      <div className='searchFieldDiv'>
        <input
          placeholder='Enter Employee ID'
          value={searchEmpId}
          onChange={e => setSearchEmpId(e.target.value)}
        />
        <div className='button' onClick={() => fetchLeavesByEmpId(searchEmpId)}>
          Search
        </div>
      </div>

      <div className='searchFieldDiv'>
        <input
          placeholder='Enter Date (DD/MM/YYYY)'
          value={searchDate}
          onChange={e => setSearchDate(e.target.value)}
        />
        <div className='button' onClick={handleDateSearch}>
          Search
        </div>
      </div>

      <p className='dateTag'>Leaves of : {displayDate}</p>

      {message && <div style={{ marginBottom: '10px', color: 'red' }}>{message}</div>}

      <table className="tableStyle">
        <thead className='tableHead'>
          <tr>
            <td className='headData'>Leave ID</td>
            <td className='headData'>Employee ID</td>
            <td className='headData'>Leave Type</td>
            <td className='headData'>Date</td>
          </tr>
        </thead>
        <tbody>
          {allRequests.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center' }}>No Data.</td>
            </tr>
          ) : (
            allRequests.map((req) => (
              <tr key={req.leaveId || req.lid}>
                <td className='empData'>{req.leaveId || req.lid}</td>
                <td className='empData'>{req.empId || req.eid}</td>
                <td className='empData'>{(req.leave_type || req.type)?.toUpperCase()}</td>
                <td className='empData'>
                  {req.leaveDate
                    ? new Date(req.leaveDate).toLocaleDateString('en-GB')
                    : req.date}
                </td>
                
              </tr>
            ))
          )}
        </tbody>
      </table>

    </div>
  );
}
