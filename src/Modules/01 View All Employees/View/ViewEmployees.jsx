import '../Style/ViewEmployees.css'


export default function ViewAllEmployees(){

var employees = [
{
    id : 1006,
    name : "Ananya Das",
    dept : "Human Resources",
    desig : "HR Business Partner",
    sal : 65000
},
{
    id : 1007,
    name : "Mohit Jain",
    dept : "Marketing",
    desig : "Marketing Specialist",
    sal : 55000
},
{
    id : 1008,
    name : "Kriti Agarwal",
    dept : "Finance",
    desig : "Financial Analyst",
    sal : 70000
},
{
    id : 1009,
    name : "Siddharth Verma",
    dept : "Software Development",
    desig : "SDE-1",
    sal : 50000
},
{
    id : 1010,
    name : "Deepika Rao",
    dept : "Quality Assurance",
    desig : "Senior QA Engineer",
    sal : 72000
},
{
    id : 1011,
    name : "Gaurav Sharma",
    dept : "DevOps",
    desig : "Lead DevOps Engineer",
    sal : 95000
},
{
    id : 1012,
    name : "Nisha Kumari",
    dept : "Data Science",
    desig : "Junior Data Scientist",
    sal : 68000
},
{
    id : 1013,
    name : "Kartik Mehta",
    dept : "Product Management",
    desig : "Associate Product Manager",
    sal : 85000
},
{
    id : 1014,
    name : "Riya Singh",
    dept : "Human Resources",
    desig : "Talent Acquisition Specialist",
    sal : 58000
},
{
    id : 1015,
    name : "Arjun Malik",
    dept : "Marketing",
    desig : "Digital Marketing Manager",
    sal : 78000
},
{
    id : 1016,
    name : "Shreya Bose",
    dept : "Finance",
    desig : "Accounts Manager",
    sal : 82000
},
{
    id : 1017,
    name : "Vivek Gupta",
    dept : "Software Development",
    desig : "SDE-2",
    sal : 65000
},
{
    id : 1018,
    name : "Pooja Hegde",
    dept : "Quality Assurance",
    desig : "QA Lead",
    sal : 80000
},
{
    id : 1019,
    name : "Harsh Vardhan",
    dept : "DevOps",
    desig : "Cloud Engineer",
    sal : 88000
},
{
    id : 1020,
    name : "Aditi Sharma",
    dept : "Data Science",
    desig : "Machine Learning Engineer",
    sal : 92000
},
{
    id : 1021,
    name : "Kunal Patel",
    dept : "Product Management",
    desig : "Senior Product Manager",
    sal : 110000
},
{
    id : 1022,
    name : "Meera Menon",
    dept : "Human Resources",
    desig : "HR Generalist",
    sal : 52000
},
{
    id : 1023,
    name : "Samir Khan",
    dept : "Marketing",
    desig : "Content Strategist",
    sal : 63000
},
{
    id : 1024,
    name : "Divya Reddy",
    dept : "Finance",
    desig : "Tax Consultant",
    sal : 77000
},
{
    id : 1025,
    name : "Rohan Singh",
    dept : "Software Development",
    desig : "Tech Lead",
    sal : 105000
}
    ];

    

    return (
        
            <table className="tableStyle">
                <thead className='tableHead'>
                    <tr>
                        <td className='headData'>ID</td>
                        <td className='headData'>NAME</td>
                        <td className='headData'>DEPARTMENT</td>
                        <td className='headData'>DESIGNATION</td>
                        <td className='headData'>SALARY</td>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((empData)=>{
                        return <tr>
                        <td className='empData'>{empData.id}</td>
                        <td className='empData'>{empData.name}</td>
                        <td className='empData'>{empData.dept}</td>
                        <td className='empData'>{empData.desig}</td>
                        <td className='empData'>Rs.{empData.sal}</td>
                        </tr>
                    })}
                </tbody>
            </table>
    );
}