import '../Style/PanelAndScreen.css';
import applogo from '../../../Assets/applogo.png';
import { useState } from 'react';
import ViewAllEmployees from '../../01ViewAllEmployees/View/ViewAllEmployees';
import ViewAttendance from '../../02ViewAttendance/View/ViewAttendance';
import ViewPayslip from '../../03ViewPayslips/View/ViewPayslip';
import ManageLeaves from '../../04ManageLeaves/View/ManageLeaves';
import LeaveRequests from '../../05LeaveRequests/View/LeaveRequests';

export default function PanelAndScreen() {
  const [highlighted, setHighlighted] = useState('item-1');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleClick = (id) => {
    setHighlighted(id);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
    <div className={`mainPage ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      {/* Hamburger Button */}
      <button className='hamburgerBtn' onClick={toggleSidebar}>
        ☰
      </button>

      {/* Sidebar */}
      <div className={`container ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className='divTitle'>
          <img src={applogo} alt="App Logo" className='appImage' />
          <div className='headerText'>
            <p className='title'>ClockIn</p>
            <p className='subTitle'>An Easy HR Assistance App</p>
          </div>
        </div>
        <br />
        <br />
        {['item-1', 'item-2', 'item-3', 'item-4', 'item-5'].map((id, index) => {
          const labels = [
            'View All Employees',
            'View Attendance',
            'View Payslips',
            'Manage Leaves',
            'Leave Requests'
          ];
          return (
            <div
              key={id}
              id={id}
              className={highlighted === id ? 'menuItemHighlighted' : 'menuItem'}
              onClick={() => handleClick(id)}>
              {labels[index]}
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className='contentArea'>
        {renderPage()}
      </div>
    </div>
  );
}