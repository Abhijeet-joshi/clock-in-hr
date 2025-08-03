import '../../../CommonUtilities/tableLayout.css';

export default function myLeaves(){

    const attendance = [
        {
            'DATE' : '04/08/2025',
            'REASON' : 'Ghar mein shadi.'
        },
        
        {
            'DATE' : '05/08/2025',
            'REASON' : 'Kutta bimar hai.'
        },
        
    ];


    return (
        <div>

            <div className='searchFieldDiv'>
            <input placeholder='Enter Date (DD/MM/YYYY)'></input>
            <div className='button'>Search</div>
            </div>

            <p className='dateTag'>Attendance of : 26/07/2025</p>

            <table className="tableStyle">
                <thead className='tableHead'>
                    <tr>
                        <td className='headData'>DATE</td>
                        <td className='headData'></td>
                        <td className='headData'>REASON</td>
                    </tr>
                </thead>
                <tbody>
                    {attendance.map((data)=>{
                        return <tr>
                        <td className='empData'>{data.DATE}</td>
                        <td className='empData'></td>
                        <td className='empData'>{data.REASON}</td>
                        </tr>
                    })}
                </tbody>
            </table>

        </div>
    );
}