import {useState, useEffect} from 'react'; 
const Donors =({state})=>{
    const [donors, setDonors]= useState([]); 
    const {contract}= state;
     

    useEffect(()=>{
        const donorsInfo=async()=>{
            const donors = await contract.getDonorInfo();  // we call our solidity function here to display names of all donors 
            setDonors(donors); 
        }; 
        contract && donorsInfo(); 
    },[contract]); 
 

return (
<>
{/* style{{backgroundColor:"#C0C0C0"}} */}
<h4 style={{ textAlign: "center", marginTop: "20px" }} >Donations Sent</h4>
<br></br>
{donors.map((Donor)=>{return( 
    <div
    className="container-fluid"
    style={{ width: "100%" }}
    key={Math.random()}
  >
    <table
    style={{
        marginBottom: "10px",
      }} class=".table-fixed text-center">
        <tbody>
        <tr>
            <td style={{
                      backgroundColor: 'rgba(238, 252, 94, 0.6)',
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      fontWeight: 'bold',
                      padding: "9px",
                      width: "10%"
                      
                    }}>{Donor.name}</td>

            <td  style={{
                      backgroundColor: 'rgba(238, 252, 94, 0.6)',
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      fontWeight: 'bold',
                      padding: "7px",
                      width: "40%"
                    }}>{Donor.message}</td>    

            <td
                    style={{
                      backgroundColor: 'rgba(238, 252, 94, 0.6)',
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      fontWeight: 'bold',
                      padding: "10px",
                      width: "20%"
                    }}
                  >
                    {new Date(Donor.timestamp * 1000).toLocaleString()}
                  </td>

            <td style={{
                      backgroundColor: 'rgba(238, 252, 94, 0.6)',
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      fontWeight: 'bold',
                      padding: "11px",
                      width: "40%"
                    }}>{Donor.DonorAddress}</td>
        </tr>
        </tbody>
    </table>
    </div>
); 
})}
</>
); 
}; 
export default Donors; 