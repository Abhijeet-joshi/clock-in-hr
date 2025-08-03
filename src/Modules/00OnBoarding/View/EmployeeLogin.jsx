import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import applogo from '../../../Assets/applogo.png';
import EmployeeDashboard from '../../06Employee/views/dashboard';

const EmployeeLogin = () => {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#222f3e',
      color: '#feca57',
    },
    formContainer: {
      backgroundColor: '#222f3e',
      padding: '40px',
      borderRadius: '12px',
      boxShadow: '0 8px 24px rgba(254, 202, 87, 0.4)',
      width: '350px'
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      color: '#feca57',
      fontWeight: '600',
      fontSize: '1.1rem',
    },

    input: {
      backgroundColor: '#101820',
      border: '1px solid #feca57',
      color: '#feca57',
      padding: '10px 15px',
      borderRadius: '6px',
      fontSize: '1rem',
    },
    
    button: {
      backgroundColor: '#feca57',
      borderColor: '#feca57',
      color: '#222f3e',
      fontWeight: '700',
      width: '100%',
      padding: '12px',
      fontSize: '1.1rem',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#e0b847',
      borderColor: '#e0b847',
    }
  };

  const [buttonHovered, setButtonHovered] = React.useState(false);

  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <form style={styles.formContainer}>
        <div className='divTitle'>
                  <img src={applogo} alt="App Logo" className='appImage' />
                  <div className='headerText'>
                    <p className='title'>ClockIn Employee</p>
                    <p className='subTitle'>An Easy HR Assistance App</p>
                  </div>
        </div>
        <br/>
        <div className="form-group" style={styles.formGroup}>
          <label htmlFor="username" style={styles.label}>Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            
            style={styles.input}
          />
        </div>
        <div className="form-group" style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            
            style={styles.input}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={()=>{
            navigate('/EmpDash');
          }}
          style={buttonHovered ? {...styles.button, ...styles.buttonHover} : styles.button}
          onMouseEnter={() => setButtonHovered(true)}
          onMouseLeave={() => setButtonHovered(false)}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default EmployeeLogin;
