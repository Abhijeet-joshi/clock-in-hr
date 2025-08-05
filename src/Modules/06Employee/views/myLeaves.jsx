import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import '../../../CommonUtilities/tableLayout.css';

export default function MyLeaves() {
  const [attendance, setAttendance] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const location = useLocation();
  const empId = location.state?.employeeId;

  useEffect(() => {
    if (!empId) return; // skip if empId not available

    fetch(`http://localhost:8080/requests/${empId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setAttendance(data);
        setFilteredAttendance(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, [empId]);

  const handleSearch = () => {
    if (!searchDate) {
      setFilteredAttendance(attendance);
      return;
    }
    // Direct string comparison, since date strings match format 'yyyy-mm-dd'
    const filtered = attendance.filter(item => item.leaveDate === searchDate);
    setFilteredAttendance(filtered);
  };

  return (
    <div>
      <div className="searchFieldDiv">
        <input
          type="date"
          placeholder="Enter Date (YYYY-MM-DD)"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <div className="button" onClick={handleSearch}>
          Search
        </div>
      </div>

      <p className="dateTag">Attendance of : {searchDate || 'All Dates'}</p>

      <table className="tableStyle">
        <thead className="tableHead">
          <tr>
            <td className="headData">DATE</td>
            <td className="headData">REASON</td>
            <td className="headData"></td>
            <td className="headData">TYPE</td>
            <td className="headData">LEAVE FOR</td>
            <td className="headData">STATUS</td>
          </tr>
        </thead>
        <tbody>
          {filteredAttendance.length > 0 ? (
            filteredAttendance.map((data, index) => (
              <tr key={index}>
                <td className="empData">{data.leaveDate}</td>
                <td className="empData">{data.reason}</td>
                <td className="empData"></td>
                <td className="empData">{data.leaveType}</td>
                <td className="empData">{data.leaveFor}</td>
                <td className="empData">{data.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="empData" colSpan={6}>
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
