import '../../../CommonUtilities/tableLayout.css';
import '../Style/ViewAttendance.css';


export default function Page2(){

    var employees = [
{
    id : 1001,
    name : "Abhijeet Joshi",
    dept : "Web Development",
    desig : "SDE-2",
    email: '26.abhijeet@gmail.com',
    sal : 75000,
    timein: '09:00 AM - 26/07/2025',
},
{
    id : 1002,
    name : "Pranay Kumar",
    dept : "Software Development",
    desig : "Backend Developer",
    email: 'pranaykumar@gmail.com',
    sal : 85000,
    timein: '08:55 AM - 26/07/2025',
},
    ];

    return (
        <div>
            
            <div className='searchFieldDiv'>
            <input placeholder='Enter Employee ID'></input>
            <div className='button'>Search</div>
            </div>

            <div className='searchFieldDiv'>
            <input placeholder='Enter Date (DD/MM/YYYY)'></input>
            <div className='button'>Search</div>
            </div>

            <p className='dateTag'>Attendance of : 26/07/2025</p>

            <table className="tableStyle">
                <thead className='tableHead'>
                    <tr>
                        <td className='headData'>ID</td>
                        <td className='headData'>NAME</td>
                        <td className='headData'>DEPARTMENT</td>
                        <td className='headData'>DESIGNATION</td>
                        <td className='headData'>ClockIn Time</td>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((empData)=>{
                        return <tr>
                        <td className='empData'>{empData.id}</td>
                        <td className='empData'>{empData.name}</td>
                        <td className='empData'>{empData.dept}</td>
                        <td className='empData'>{empData.desig}</td>
                        <td className='empData'>{empData.timein}</td>
                        </tr>
                    })}
                </tbody>
            </table>

        </div>
    );
}