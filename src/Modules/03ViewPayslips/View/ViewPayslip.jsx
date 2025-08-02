import { useState } from 'react';
import '../../02ViewAttendance/Style/ViewAttendance.css';
import '../Style/ViewPayslip.css';


export default function Page3(){

    var [vis, setVis] = useState(false);

    return (
        
        <div>
            <div className='searchFieldDiv'>
            <input placeholder='Enter Employee ID'></input>
            <input placeholder='Enter Month-Year'></input>
            <div className='button' onClick={()=>{
                setVis(true);
            }}>Search</div>
            </div>   
            
            {
            vis==true ? <div className='payslipContainer'>
                <p className='employeeName'>Abhijeet Joshi</p>
                <p className='employeeDetails'>Software Development</p>
                <p className='employeeDetails'>SDE - 3</p>
                <div className='payslipDetDiv'>

                    <div className='paySlipTitleRow'>
                        <p className='employeeName'>Employee Payslip</p>
                    </div>
                    
                    <p className='employeeDetails'>June - 2025</p>
                    <br/>
                    <p className='employeeDetails'>Salary - Rs. 75000</p>
                    <p className='employeeDetails'>June 2025 Compensation - Rs. 68566</p>
                    <br/>
                    <p className='employeeDetails'>Paid Leaves - 1</p>
                    <p className='employeeDetails'>Casual Leaves - 2</p>
                    
                </div>
            </div> : <div></div>
            }

        </div>
    );
}