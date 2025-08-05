import '../../../CommonUtilities/tableLayout.css';







export default function myAttendance(){

    const attendance = [
        {
            'DATE' : '',
            'STATUS' : ''
        },
        
        {
            'DATE' : '',
            'STATUS' : ''
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
                        <td className='headData'>DATE AND TIME</td>
                        <td className='headData'></td>
                        <td className='headData'>STATUS</td>
                    </tr>
                </thead>
                <tbody>
                    {attendance.map((data)=>{
                        return <tr>
                        <td className='empData'>{data.DATE}</td>
                        <td className='empData'></td>
                        <td className='empData'>{data.STATUS}</td>
                        </tr>
                    })}
                </tbody>
            </table>

        </div>
    );
}