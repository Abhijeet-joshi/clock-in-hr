import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import applogo from '../../../Assets/applogo.png';
import axios from 'axios';
//import EmployeeDashboard from '../../06Employee/views/dashboard';

//employee login page
const EmployeeLogin = ({expectedDepartment}) => {
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
    },

     errorCard: {
    marginTop: '15px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #f5c6cb',
    textAlign: 'center',
  }

  };

  const [buttonHovered, setButtonHovered] = React.useState(false);
   const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();

    try{

       const response = await axios.get('http://localhost:8080/showEmp');
        const user = response.data.find((emp) => (emp.email === email || emp.empName === email) && emp.password === password);

      if (!user){
        return setError('Invalid credentials');
      } else{
        navigate('/EmpDash', { state: { employeeId: user.empId, employee: user } });
      }

    }
    catch (err) {
      setError('API error. Try again later.');
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.formContainer}  onSubmit={handleLogin}>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>
        <div className="form-group" style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
         
          style={buttonHovered ? {...styles.button, ...styles.buttonHover} : styles.button}
          onMouseEnter={() => setButtonHovered(true)}
          onMouseLeave={() => setButtonHovered(false)}
        >
          Login
        </button>
         {error && <div style={styles.errorCard}>{error}</div>}
      </form>
    </div>
  );
};

export default EmployeeLogin;
