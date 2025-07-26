import '../Style/ViewEmployees.css'
import '../../../Common Utilities/tableLayout.css';


export default function ViewAllEmployees(){

var employees = [
{
    id : 1001,
    name : "Abhijeet Joshi",
    dept : "Web Development",
    desig : "SDE-2",
    email: '26.abhijeet@gmail.com',
    sal : 75000
},
{
    id : 1002,
    name : "Pranay Kumar",
    dept : "Software Development",
    desig : "Backend Developer",
    email: 'pranaykumar@gmail.com',
    sal : 85000
},
    ];

    function getEmployees(){
        
    }
    

    return (
        
            <table className="tableStyle">
                <thead className='tableHead'>
                    <tr>
                        <td className='headData'>ID</td>
                        <td className='headData'>NAME</td>
                        <td className='headData'>DEPARTMENT</td>
                        <td className='headData'>DESIGNATION</td>
                        <td className='headData'>EMAIL</td>
                        <td className='headData'>ACTIONS</td>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((empData)=>{
                        return <tr>
                            <td className='empData'>{empData.id}</td>
                        <td className='empData'>{empData.name}</td>
                        <td className='empData'>{empData.dept}</td>
                        <td className='empData'>{empData.desig}</td>
                        <td className='empData'>{empData.email}</td>
                        <td className='highlightedData'>View Employee</td>
                        </tr>
                    })}
                </tbody>
            </table>
    );
}