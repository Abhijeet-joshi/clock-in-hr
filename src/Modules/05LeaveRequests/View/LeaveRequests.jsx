import React, { useState, useEffect } from 'react';
import '../../../CommonUtilities/tableLayout.css';
import '../Style/LeaveRequests.css';

export default function LeaveRequest() {
  const [allRequests, setAllRequests] = useState([]);
  const [searchEmpId, setSearchEmpId] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [message, setMessage] = useState('');
  const [displayDate, setDisplayDate] = useState('');

  // Modal related states
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  // Fetch all leave requests
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

  // Fetch leave requests by Employee ID
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

  // Filter requests by date (yyyy-mm-dd)
  const handleDateSearch = () => {
    if (!searchDate.trim()) {
      setMessage('Please enter a date.');
      return;
    }
    setMessage('');
    const filtered = allRequests.filter((req) => {
      if (!req.leaveDate) return false;
      const dateOnly = req.leaveDate.split('T')[0];
      return dateOnly === searchDate.trim();
    });
    setAllRequests(filtered);
    setDisplayDate(searchDate.trim());
    if (filtered.length === 0) setMessage('No leave requests found for given date.');
  };

  // Fetch a single request by reqId and open modal
  const fetchRequestById = async (reqId) => {
    setModalMessage('Loading...');
    setModalLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/showRequest/${reqId}`);
      if (!res.ok) throw new Error('Failed to fetch request.');
      const data = await res.json();

      if (!data.leaveDate) {
        setModalMessage('leaveDate cannot be null. Cannot update this request.');
        setSelectedRequest(null);
        setModalLoading(false);
        return;
      }

      setSelectedRequest(data);
      setUpdatedStatus(data.status || 'Pending');
      setModalMessage('');
    } catch (err) {
      setModalMessage('Error fetching request details.');
      setSelectedRequest(null);
    } finally {
      setModalLoading(false);
    }
  };

  // Update the leave request’s status by sending full request with updated status
  const updateRequestStatus = async (reqId) => {
    if (!selectedRequest || !selectedRequest.leaveDate) {
      setModalMessage('Cannot update without a valid leaveDate.');
      return;
    }

    setModalMessage('Updating...');
    setModalLoading(true);

    try {
      // Send full request payload with updated status only changed
      const updatePayload = {
        ...selectedRequest,
        status: updatedStatus,
      };

      const res = await fetch(`http://localhost:8080/updateRequest/${reqId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatePayload),
      });

      if (!res.ok) throw new Error('Failed to update status.');

      setModalMessage('Status updated successfully.');

      // Update local state — update the status only for the matching request
      setAllRequests((prev) =>
        prev.map((req) => (req.reqId === reqId ? { ...req, status: updatedStatus } : req))
      );

      setTimeout(() => {
        setSelectedRequest(null);
        setModalMessage('');
        setModalLoading(false);
      }, 1000);
    } catch (err) {
      setModalMessage('Error updating status.');
      setModalLoading(false);
    }
  };

  return (
    <div>
      {/* Employee ID Search */}
      <div className="searchFieldDiv">
        <input
          placeholder="Enter Employee ID"
          value={searchEmpId}
          onChange={(e) => setSearchEmpId(e.target.value)}
        />
        <div className="button" onClick={() => fetchRequestsByEmpId(searchEmpId)}>
          Search
        </div>
      </div>

      {/* Date Search */}
      <div className="searchFieldDiv">
        <input
          type="date"
          placeholder="Enter Date (yyyy-mm-dd)"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <div className="button" onClick={handleDateSearch}>
          Search
        </div>
      </div>

      <p className="dateTag">Leave Requests of : {displayDate}</p>
      {message && <div style={{ marginBottom: '10px', color: 'red' }}>{message}</div>}

      {/* Leave Requests Table */}
      <table className="tableStyle">
        <thead className="tableHead">
          <tr>
            <td className="headData">Leave ID</td>
            <td className="headData">Employee ID</td>
            <td className="headData">Leave Type</td>
            <td className="headData">Leave For</td>
            <td className="headData">Reason</td>
            <td className="headData"></td>
            <td className="headData">Date</td>
            <td className="headData"></td>
            <td className="headData">Status</td>
          </tr>
        </thead>
        <tbody>
          {allRequests.length === 0 ? (
            <tr>
              <td colSpan={9} style={{ textAlign: 'center' }}>
                No Data.
              </td>
            </tr>
          ) : (
            allRequests.map((req) => (
              <tr key={req.reqId}>
                <td className="empData">{req.reqId || req.lid}</td>
                <td className="empData">{req.empId || req.eid}</td>
                <td className="empData">{req.leaveType || req.type}</td>
                <td className="empData">{req.leaveFor || req.off}</td>
                <td className="empData">{req.reason}</td>
                <td className="empData"></td>
                <td className="empData">{req.leaveDate ? req.leaveDate.split('T')[0] : req.date || 'N/A'}</td>
                <td className="empData"></td>
                <td className="empData">
                  <button
                    className={`status-button ${
                      req.status === 'Approved'
                        ? 'status-approved'
                        : req.status === 'Rejected'
                        ? 'status-rejected'
                        : 'status-pending'
                    }`}
                    onClick={() => fetchRequestById(req.reqId)}
                    title="Click to update status"
                    type="button"
                  >
                    {req.status}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal Popup */}
      {selectedRequest && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h3>Update Leave Request Status</h3>
            {modalMessage === 'leaveDate cannot be null. Cannot update this request.' ? (
              <p className="error-message">{modalMessage}</p>
            ) : (
              <>
                <p>
                  <strong>Request ID:</strong> {selectedRequest.reqId}
                </p>
                <p>
                  <strong>Employee ID:</strong> {selectedRequest.empId}
                </p>
                <p>
                  <strong>Leave Type:</strong> {selectedRequest.leaveType}
                </p>
                <p>
                  <strong>Leave For:</strong> {selectedRequest.leaveFor}
                </p>
                <p>
                  <strong>Reason:</strong> {selectedRequest.reason}
                </p>
                <p>
                  <strong>Date:</strong> {selectedRequest.leaveDate.split('T')[0]}
                </p>
                <label>
                  Status:
                  <select
                    value={updatedStatus}
                    onChange={(e) => setUpdatedStatus(e.target.value)}
                    disabled={modalLoading}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </label>
                <div style={{ marginTop: '20px' }}>
                  <button
                    onClick={() => updateRequestStatus(selectedRequest.reqId)}
                    disabled={modalLoading}
                    type="button"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setSelectedRequest(null)}
                    disabled={modalLoading}
                    style={{ marginLeft: '15px' }}
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
                {modalMessage &&
                  modalMessage !== 'leaveDate cannot be null. Cannot update this request.' && (
                    <p className="error-message">{modalMessage}</p>
                  )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        /* Modal overlay */
        .modalOverlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(34, 47, 62, 0.85); /* #222f3e with opacity */
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease forwards;
        }
        @keyframes fadeIn {
          from {opacity: 0;}
          to {opacity: 1;}
        }
        /* Modal content */
        .modalContent {
          background-color: #222f3e;
          color: #ffffff;
          padding: 25px 30px;
          border-radius: 12px;
          width: 350px;
          box-shadow: 0 8px 30px rgba(17, 21, 44, 0.7);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          position: relative;
        }
        .modalContent h3 {
          margin-top: 0;
          font-weight: 700;
          font-size: 1.7em;
          letter-spacing: 1px;
          text-align: center;
          margin-bottom: 20px;
          color: #feca57;
          text-shadow: 0 0 10px #feca57;
        }
        .modalContent p {
          margin: 8px 0;
          font-size: 1em;
          line-height: 1.4;
        }
        .modalContent label {
          display: block;
          margin-top: 15px;
          font-weight: 600;
          font-size: 1em;
          margin-bottom: 5px;
          color: #feca57;
        }
        .modalContent select {
          width: 100%;
          padding: 8px 10px;
          border-radius: 8px;
          border: none;
          font-size: 1em;
          font-weight: 600;
          background-color: #feca57;
          color: #222f3e;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
          transition: background-color 0.3s ease;
          cursor: pointer;
        }
        .modalContent select:focus {
          outline: none;
          background-color: #ffc837;
          box-shadow: 0 0 6px #feca57;
        }
        .modalContent button {
          cursor: pointer;
          font-weight: 700;
          padding: 10px 20px;
          border-radius: 10px;
          margin-top: 20px;
          border: none;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
          color: #222f3e;
          font-size: 1em;
          box-shadow: 0 4px 12px rgba(254, 202, 87, 0.6);
        }
        .modalContent button:disabled {
          cursor: not-allowed;
          opacity: 0.6;
          box-shadow: none;
        }
        .modalContent button:first-of-type {
          background-color: #feca57;
        }
        .modalContent button:first-of-type:hover:not(:disabled) {
          background-color: #ffcb6a;
          box-shadow: 0 6px 18px rgba(254, 202, 87, 0.85);
        }
        .modalContent button:last-of-type {
          background-color: #feca57;
          margin-left: 15px;
        }
        .modalContent button:last-of-type:hover:not(:disabled) {
          background-color: #ffcb6a;
          box-shadow: 0 6px 18px rgba(254, 202, 87, 0.85);
        }
        .modalContent p.error-message {
          margin-top: 15px;
          font-weight: 700;
          font-size: 0.95em;
          color: #feca57;
          text-align: center;
          text-shadow: 0 0 5px #feca57;
        }
        /* Status button styles */
        .status-button {
          cursor: pointer;
          border: none;
          padding: 5px 10px;
          border-radius: 3px;
          font-weight: bold;
          font-size: 0.9em;
          color: #ffffff;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }
        .status-approved {
          background-color: green;
          box-shadow: 0 2px 6px rgba(0, 128, 0, 0.7);
        }
        .status-approved:hover {
          background-color: #006400;
          box-shadow: 0 4px 12px rgba(0, 100, 0, 0.8);
        }
        .status-rejected {
          background-color: red;
          box-shadow: 0 2px 6px rgba(255, 0, 0, 0.7);
        }
        .status-rejected:hover {
          background-color: #8b0000;
          box-shadow: 0 4px 12px rgba(139, 0, 0, 0.8);
        }
        .status-pending {
          background-color: orange;
          box-shadow: 0 2px 6px rgba(255, 165, 0, 0.7);
        }
        .status-pending:hover {
          background-color: #cc8400;
          box-shadow: 0 4px 12px rgba(204, 132, 0, 0.8);
        }
      `}</style>
    </div>
  );
}
