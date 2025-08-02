import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PanelAndScreen from './Modules/00OnBoarding/View/PanelAndScreen';
import ViewEmployee from './Modules/01ViewAllEmployees/View/ViewEmployee';
import AddNewEmployee from './Modules/01ViewAllEmployees/View/AddNewEmployee';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PanelAndScreen/>}/>
        <Route path="/ViewEmployee" element={<ViewEmployee/>} />
        <Route path="/AddNewEmployee" element={<AddNewEmployee/>} />
      </Routes>
    </Router>
  );
}

export default App;
