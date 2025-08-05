import React, { useState, useEffect } from 'react';
import '../../../CommonUtilities/tableLayout.css';
import { useLocation } from "react-router-dom";

export default function MyAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const location = useLocation();
  const empId = location.state?.employeeId;

  // Helper to sort descending by clockInDate string yyyy-mm-dd
  function sortByDateDesc(data) {
    return [...data].sort((a, b) => b.clockInDate.localeCompare(a.clockInDate));
  }

  useEffect(() => {
    // Fetch attendance data for employee
    fetch(`http://localhost:8080/showAttendence/employee/${empId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const sortedData = sortByDateDesc(data);
        setAttendance(sortedData);
        setFilteredAttendance(sortedData);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, [empId]);

  const handleSearch = () => {
    if (!searchDate) {
      setFilteredAttendance(attendance);
      return;
    }
    const filtered = attendance.filter(item => {
      // Extract date part from clockInDate if it has time info
      const itemDate = item.clockInDate ? item.clockInDate.split('T')[0] : '';
      return itemDate === searchDate;
    });
    setFilteredAttendance(sortByDateDesc(filtered));
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
        <div className="button" onClick={handleSearch}>Search</div>
      </div>

      <p className="dateTag">Attendance of : {searchDate || 'All Dates'}</p>

      <table className="tableStyle">
        <thead className="tableHead">
          <tr>
            <td className="headData">DATE AND TIME</td>
            <td className="headData"></td>
            <td className="headData">STATUS</td>
          </tr>
        </thead>
        <tbody>
          {filteredAttendance.length > 0 ? (
            filteredAttendance.map((data, index) => (
              <tr key={index}>
                <td className="empData">{data.clockInDate}</td>
                <td className="empData"></td>
                <td className="empData">{data.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="empData" colSpan={3}>
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
