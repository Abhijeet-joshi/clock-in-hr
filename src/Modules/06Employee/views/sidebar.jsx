import applogo from '../../../Assets/applogo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import MyAttendance from "./myAttendance";
import MyLeaves from "./myLeaves";
import RequestLeave from "./requestLeave";



export default function PanelAndScreen() {
  const [highlighted, setHighlighted] = useState('item-1');
  const handleClick = (id) => {
    setHighlighted(id);
  };


  const renderPage = () => {
    switch (highlighted) {
      case 'item-1':
        return <MyAttendance />;
      case 'item-2':
        return <MyLeaves/>;
      case 'item-3':
        return <RequestLeave/>;
      default:
        return null;
    }
  };

  const navigate = useNavigate();

  return (
    <div className={`fullPage`}>
      <div className={`navigationPanel`}>
        <div className='divTitle'>
          <img src={applogo} alt="App Logo" className='appImage' />
          <div className='headerText'>
            <p className='title'>ClockIn</p>
            <p className='subTitle'>An Easy HR Assistance App</p>
          </div>
        </div>
        <br />
        <br />
        {['item-1', 'item-2', 'item-3', 'item-4'].map((id, index) => {
          const labels = [
            'My Attendance',
            'My Leaves',
            'Leave Requests',
            'Log out'
          ];
          return (
            <div
              key={id}
              id={id}
              className={highlighted === id ? 'menuItemHighlighted' : 'menuItem'}
              onClick={
                () => {
                  handleClick(id);
                  if(id==='item-4'){
                    navigate('/');
                  }
                }
                }>
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