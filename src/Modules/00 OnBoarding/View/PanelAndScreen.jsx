import '../Style/PanelAndScreen.css';
import applogo from '../../../Assets/applogo.png';
import { useState } from 'react';
import ViewAllEmployees from '../../01 View All Employees/View/ViewAllEmployees';
import ViewAttendance from '../../02 View Attendance/View/ViewAttendance';
import ViewPayslip from '../../03 View Payslips/View/ViewPayslip';
import ManageLeaves from '../../04 Manage Leaves/View/ManageLeaves';
import LeaveRequests from '../../05 Leave Requests/View/LeaveRequests';

export default function PanelAndScreen(){

  const [highlighted, setHighlighted] = useState('item-1');

  const handleClick = (id) => {
    setHighlighted(id);
  };

  const renderPage = () => {
    switch (highlighted) {
      case 'item-1':
        return <ViewAllEmployees />;
      case 'item-2':
        return <ViewAttendance />;
      case 'item-3':
        return <ViewPayslip />;
      case 'item-4':
        return <ManageLeaves />;
      case 'item-5':
        return <LeaveRequests />;
      default:
        return null;
    }
  };

    return (
    <div className='mainPage'>
    <div className='container'>
        <div className='divTitle'>
            <img src={applogo} alt="App Logo" className='appImage'/>
            <div className='headerText'>
            <p className='title'>ClockIn</p>
            <p className='subTitle'>An Easy HR Assistance App</p>
            </div>
        </div>
        <br/>
        <br/>
        <div
        id='item-1'
        className={highlighted === 'item-1' ? 'menuItemHighlighted' : 'menuItem'}
        onClick={() => handleClick('item-1')}
      >
        View All Employees
      </div>
      <div
        id='item-2'
        className={highlighted === 'item-2' ? 'menuItemHighlighted' : 'menuItem'}
        onClick={() => handleClick('item-2')}
      >
        View Attendance
      </div>
      <div
        id='item-3'
        className={highlighted === 'item-3' ? 'menuItemHighlighted' : 'menuItem'}
        onClick={() => handleClick('item-3')}
      >
        View Payslips
      </div>
      <div
        id='item-4'
        className={highlighted === 'item-4' ? 'menuItemHighlighted' : 'menuItem'}
        onClick={() => handleClick('item-4')}
      >
        Manage Leaves
      </div>
      <div
        id='item-5'
        className={highlighted === 'item-5' ? 'menuItemHighlighted' : 'menuItem'}
        onClick={() => handleClick('item-5')}
      >
        Leave Requests
      </div>

      </div>

      <div>
        {renderPage()}
      </div>
      
    </div>);
}