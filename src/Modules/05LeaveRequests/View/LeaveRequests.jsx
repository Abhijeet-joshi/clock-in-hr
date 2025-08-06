import React, { useState, useEffect } from 'react';
import '../../../CommonUtilities/tableLayout.css';
import '../Style/LeaveRequests.css';

export default function LeaveRequest() {
  const [allRequests, setAllRequests] = useState([]);
  const [searchEmpId, setSearchEmpId] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [message, setMessage] = useState('');
  const [displayDate, setDisplayDate] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setMessage('Loading...');
    try {
      const res = await fetch('http://localhost:8080/showAllRequest');
      if (!res.ok) throw new Error('Failed to fetch leave requests.');
      const data = await res.json();
      setAllRequests(data);
      setMessage('');
    } catch (err) {
      setAllRequests([]);
      setMessage('Error fetching leave requests.');
    }
  };

  const fetchRequestsByEmpId = async (empId) => {
    if (!empId.trim()) {
      setMessage('Please enter Employee ID.');
      return;
    }
    setMessage('Loading...');
    try {
      const res = await fetch(`http://localhost:8080/requests/${empId.trim()}`);
      if (!res.ok) {
        if (res.status === 204) {
          setAllRequests([]);
          setMessage('No leave requests found for given Employee ID.');
          return;
        }
        throw new Error('Failed to fetch leave requests by Employee ID.');
      }
      const data = await res.json();
      setAllRequests(Array.isArray(data) ? data : [data]);
      setMessage('');
    } catch (err) {
      setAllRequests([]);
      setMessage('Error fetching leave requests by Employee ID.');
    }
  };

  // Date search filtering — assume leaveDate format is ISO yyyy-mm-dd or yyyy-mm-ddTHH:mm:ss
  const handleDateSearch = () => {
    if (!searchDate.trim()) {
      setMessage('Please enter a date.');
      return;
    }
    setMessage('');
    // Normalize and compare only date portion yyyy-mm-dd
    let filtered = allRequests.filter(req => {
      if (!req.leaveDate) return false;
      // Extract date portion only (in case datetime string)
      const dateOnly = req.leaveDate.split('T')[0];
      return dateOnly === searchDate.trim();
    });
    setAllRequests(filtered);
    setDisplayDate(searchDate.trim());
    if (filtered.length === 0) setMessage('No leave requests found for given date.');
  };

  return (
    <div>
      <div className='searchFieldDiv'>
        <input
          placeholder='Enter Employee ID'
          value={searchEmpId}
          onChange={e => setSearchEmpId(e.target.value)}
        />
        <div className='button' onClick={() => fetchRequestsByEmpId(searchEmpId)}>
          Search
        </div>
      </div>

      <div className='searchFieldDiv'>
        <input
          type="date"
          placeholder='Enter Date (yyyy-mm-dd)'
          value={searchDate}
          onChange={e => setSearchDate(e.target.value)}
        />
        <div className='button' onClick={handleDateSearch}>
          Search
        </div>
      </div>

      <p className='dateTag'>Leave Requests of : {displayDate}</p>

      {message && <div style={{ marginBottom: '10px', color: 'red' }}>{message}</div>}

      <table className="tableStyle">
        <thead className='tableHead'>
          <tr>
            <td className='headData'>Leave ID</td>
            <td className='headData'>Employee ID</td>
            <td className='headData'>Leave Type</td>
            <td className='headData'>Leave For</td>
            <td className='headData'>Reason</td>
            <td className='headData'></td>
            <td className='headData'>Date</td>
            <td className='headData'></td>
            <td className='headData'>Status</td>
          </tr>
        </thead>
        <tbody>
          {allRequests.length === 0 ? (
            <tr>
              <td colSpan={9} style={{ textAlign: 'center' }}>No Data.</td>
            </tr>
          ) : (
            allRequests.map((req) => (
              <tr>
                <td className='empData'>{req.reqId || req.lid}</td>
                <td className='empData'>{req.empId || req.eid}</td>
                <td className='empData'>{req.leaveType || req.type}</td>
                <td className='empData'>{req.leaveFor || req.off}</td>
                <td className='empData'>{req.reason}</td>
                <td className='empData'></td>
                <td className='empData'>{req.leaveDate ? req.leaveDate.split('T')[0] : req.date}</td>
                <td className='empData'></td>
                <td className='empData'>
  <button
    className={`status-button ${
      req.status === 'Approved' ? 'status-approved' :
      req.status === 'Pending' ? 'status-pending' : 'status-rejected'
    }`}
  >
    {req.status}
  </button>
</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
