import '../Styles/PanelAndScreenStyle.css';
import applogo from '../Assets/applogo.png';
import { useState } from 'react';
import Page1 from '../Pages/Page1';
import Page2 from '../Pages/Page2';
import Page3 from '../Pages/Page3';
import Page4 from '../Pages/Page4';
import Page5 from '../Pages/Page5';
import Page6 from '../Pages/Page6';

export default function PanelAndScreen(){

  const [highlighted, setHighlighted] = useState('item-1');

  const handleClick = (id) => {
    setHighlighted(id);
  };

  const renderPage = () => {
    switch (highlighted) {
      case 'item-1':
        return <Page1 />;
      case 'item-2':
        return <Page2 />;
      case 'item-3':
        return <Page3 />;
      case 'item-4':
        return <Page4 />;
      case 'item-5':
        return <Page5 />;
      case 'item-6':
        return <Page6 />;
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
        Manage Attendance
      </div>
      <div
        id='item-5'
        className={highlighted === 'item-5' ? 'menuItemHighlighted' : 'menuItem'}
        onClick={() => handleClick('item-5')}
      >
        Manage Meetings
      </div>
      <div
        id='item-6'
        className={highlighted === 'item-6' ? 'menuItemHighlighted' : 'menuItem'}
        onClick={() => handleClick('item-6')}
      >
        Employee Leaves
      </div>

      </div>

      <div>
        {renderPage()}
      </div>
      
    </div>);
}