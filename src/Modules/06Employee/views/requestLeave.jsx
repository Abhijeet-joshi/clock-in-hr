import React from 'react';
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
};

const SimpleLeaveRequest = () => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    
      <form style={styles.formContainer}>
        <input
          type="text"
          style={styles.input}
          placeholder="Enter date"
        />
        <textarea
          style={styles.textarea}
          placeholder="Reason of leave"
          maxLength={480} // Accept more words
        />
        <button
          type="submit"
          style={isHovered ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Apply for Leave
        </button>
      </form>
    
  );
};

export default SimpleLeaveRequest;
