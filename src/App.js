import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserTypeCards from './Modules/00OnBoarding/View/TypeOfUsers';
import PanelAndScreen from './Modules/00OnBoarding/View/PanelAndScreen';
import ViewEmployee from './Modules/01ViewAllEmployees/View/ViewEmployee';
import AddEmployee from './Modules/01ViewAllEmployees/View/AddNewEmployee';
import LoginSignUp from './Modules/00OnBoarding/View/LoginSignup';
import EmployeeLogin from './Modules/00OnBoarding/View/EmployeeLogin';
import MyProfile from './Modules/06Employee/views/myProfile';
//import HRLogin from './Modules/00OnBoarding/View/LoginSignup';
import EmployeeDashboard from './Modules/06Employee/views/dashboard';
import HRDetails from './Modules/07HRProfile/View/HrProfile';

function App() { 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserTypeCards/>}/>
        <Route path="/HRLogin" element={<LoginSignUp expectedDepartment="hr"/>}/>
        <Route path="/dashboard" element={<PanelAndScreen/>}/>
        <Route path="/ViewEmployee" element={<ViewEmployee/>} />
        <Route path="/AddNewEmployee" element={<AddEmployee/>} />
        <Route path="/EmployeeLogin" element={<EmployeeLogin  expectedDepartment="hr"/>} />
        {/* <Route path="/HRLogin" element={<HRLogin />} /> */}
        <Route path="/EmpDash" element={<EmployeeDashboard/>} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/hrprofile" element={<HRDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
