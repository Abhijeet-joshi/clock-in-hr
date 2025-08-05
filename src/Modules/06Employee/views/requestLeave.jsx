import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';




const styles = {
  container: {
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Plain White Background
  },
  formContainer: {
    margin: '10px',
    backgroundColor: '#fff',
    padding: '10px 5px',
    
    
    width: '385px',
    
  },
  input: {
    border: '2px solid #222f3e',
    borderRadius: '7px',
    padding: '12px',
    fontSize: '1rem',
    color: '#222f3e',
    marginBottom: '22px',
    width: '100%',
    background: '#fff'
  },
  textarea: {
    border: '2px solid #222f3e',
    borderRadius: '7px',
    padding: '12px',
    fontSize: '1rem',
    color: '#222f3e',
    height: '96px',
    width: '100%',
    resize: 'vertical',
    background: '#fff',
    marginBottom: '22px',
  },
  button: {
    backgroundColor: '#222f3e',
    color: '#fff',
    border: 'none',
    borderRadius: '7px',
    padding: '12px',
    fontSize: '1rem',
    width: '100%',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#444c5e',
  },
   select: {
    border: '2px solid #222f3e',
    borderRadius: '7px',
    padding: '12px',
    fontSize: '1rem',
    color: '#222f3e',
    background: '#fff',
    marginBottom: '22px',
    width: '100%',
  },
  popupOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  popupCard: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 2px 15px rgba(0,0,0,0.2)',
    maxWidth: '400px',
  },
  popupButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#222f3e',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  }
};


const SimpleLeaveRequest = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [leaveDate, setLeaveDate] = useState('');
  const [reason, setReason] = useState('');
  const [leaveType, setLeaveType] = useState('PL');
  const [leaveFor, setLeaveFor] = useState('Full Day'); // New state
   const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestPayload = {
      empId: '1001',
      leaveType,
      leaveFor,
      reason,
      leaveDate,
      status: 'Pending'
    };

     try {
      await axios.post('http://localhost:8080/addRequest', requestPayload);
      setShowConfirmation(true);
    } catch (error) {
      console.error("Error submitting leave request:", error);
    }




  };

  return (
    <div style={styles.inputGroup}>
      <form style={styles.formContainer} onSubmit={handleSubmit}>
    
        <input
          type="text"
          style={styles.input}
          placeholder="Enter date"
          value={leaveDate}
          onChange={(e) => setLeaveDate(e.target.value)}
        />
        
        <textarea
          style={styles.textarea}
          placeholder="Reason of leave"
          maxLength={480}
          value={reason}// Accept more words
          onChange={(e) => setReason(e.target.value)}
        />
         <select
          style={styles.select}
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
        >
          <option value="PL">PL</option>
          <option value="CL">CL</option>
          <option value="SL">SL</option>
        </select>
      

      
        <select
          style={styles.select}
          value={leaveFor}
          onChange={(e) => setLeaveFor(e.target.value)}
        >
          <option value="Full Day">Full Day</option>
          <option value="Half Day">Half Day</option>
        </select>
      
      


        <button
          type="submit"
          style={isHovered ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Apply for Leave
        </button>
      </form>

      {showConfirmation && (
      <div style={styles.popupOverlay}>
        <div style={styles.popupCard}>
          <h4>Leave Application Submitted</h4>
          <p>Your leave request has been successfully recorded.</p>
          <button
            style={styles.popupButton}
            onClick={() => window.location.reload()}
          >
            OK
          </button>
        </div>
      </div>
    )}

      
     </div>

    
  );
};

export default SimpleLeaveRequest;
