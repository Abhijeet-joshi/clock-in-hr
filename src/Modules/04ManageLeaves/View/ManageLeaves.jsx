import '../../../CommonUtilities/tableLayout.css';

export default function Page4(){

    var allRequests = [
        {
            lid : '101',
            eid : '1001',
            type : 'CL',
            off : 'Full Day',
            date : '25/07/2025',
            reason : 'Medical Issue'
        },
        {
            lid : '102',
            eid : '1002',
            type : 'PL',
            off : 'Half Day',
            date : '25/07/2025',
            reason : 'Health Checkup'
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
        
        <p className='dateTag'>Leaves of : 26/07/2025</p>

        <table className="tableStyle">
                <thead className='tableHead'>
                    <tr>
                        <td className='headData'>Leave ID</td>
                        <td className='headData'>Employee ID</td>
                        <td className='headData'>Leave Type</td>
                        <td className='headData'>Leave For</td>
                        <td className='headData'>Date</td>
                        <td className='headData'>Reason</td>
                    </tr>
                </thead>
                <tbody>
                    {allRequests.map((req)=>{
                        return <tr>
                        <td className='empData'>{req.lid}</td>
                        <td className='empData'>{req.eid}</td>
                        <td className='empData'>{req.type}</td>
                        <td className='empData'>{req.off}</td>
                        <td className='empData'>{req.date}</td>
                        <td className='empData'>{req.reason}</td>
                        </tr>
                    })}
                </tbody>
            </table>
            </div>
    );
}