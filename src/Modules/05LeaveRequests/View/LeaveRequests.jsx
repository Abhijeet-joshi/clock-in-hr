import '../../../CommonUtilities/tableLayout.css';
import '../Style/LeaveRequests.css';

export default function Page5(){
    var allRequests = [
        {
            lid : '101',
            eid : '1001',
            type : 'CL',
            off : 'Full Day',
            reason : 'Medical Issue',
            date : '25/07/2025',
            status : 'Pending',
        },
        {
            lid : '102',
            eid : '1002',
            type : 'PL',
            off : 'Half Day',
            reason : 'Health Checkup',
            date : '25/07/2025',
            status : 'Approved',
        },
    ];

    return (

        <div>
            <div className='searchFieldDiv'>
            <input placeholder='Enter Employee ID'></input>
            <div className='button'>Search</div>
            </div>

            <p className='dateTag'>Leave Requests of : 26/07/2025</p>
        
        <table className="tableStyle">
                <thead className='tableHead'>
                    <tr>
                        <td className='headData'>Leave ID</td>
                        <td className='headData'>Employee ID</td>
                        <td className='headData'>Leave Type</td>
                        <td className='headData'>Leave For</td>
                        <td className='headData'>Reason</td>
                        <td className='headData'>Date</td>
                        <td className='headData'>Status</td>
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
                        <td className={`${req.status == 'Pending' ? 'pending' : 'approved'}`}>{req.status}</td>
                        </tr>
                    })}
                </tbody>
            </table>
            </div>
    );
}