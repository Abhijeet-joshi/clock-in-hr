import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const USERS = [
  {
    name: 'HR',
  },
  {
    name: 'Employee',
  },
];

const cardStyles = {
  container: {
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222f3e',
  },
  row: {
    display: 'flex',
    gap: '36px',
  },
  card: {
    backgroundColor: '#101820',
    border: '1.5px solid #feca57',
    borderRadius: '14px',
    boxShadow: '0 8px 24px rgba(254, 202, 87, 0.14)',
    width: '220px',
    textAlign: 'center',
    cursor: 'pointer',
    color: '#feca57',
    transition: 'transform 0.2s ease, box-shadow 0.2s',
    fontFamily: 'inherit',
    padding: '56px 0 48px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardHeader: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#feca57',
    letterSpacing: '1px',
  },
};



export default function UserTypeCards(){
  
  const navigate = useNavigate();

  return (

  <div style={cardStyles.container}>
    <div style={cardStyles.row}>
      {USERS.map((user) => (
        <div key={user.name} style={cardStyles.card} onClick={()=>{
          if(user.name==='HR'){
            navigate('/HRLogin');
          }else{
            navigate('/EmployeeLogin');
          }
        }}>
          <div style={cardStyles.cardHeader}>{user.name}</div>
        </div>
      ))}
    </div>
  </div>
);

}
