import { ethers } from "ethers"
const Donate = ({ state }) => {

    const DonateEth = async (event) => {
        event.preventDefault();
        const { contract } = state;
        const name = document.querySelector("#name").value;
        const message = document.querySelector("#message").value;
        console.log(name, message, contract);
        const amount = { value: ethers.utils.parseEther("0.001") }; // This is the amount of ether we will set for donation 
        const transaction = await contract.Donate(name, message, amount); // call our Solidity Function
        await transaction.wait();
        console.log("Donation Successfull");
    }; 
    return( <>
        <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
        <form onSubmit={DonateEth}>
            <div className="mb-3">
                <h5 className="form-label" id="fnt">Name: </h5>
                <input type="text" className="form-control" id="name" placeholder="Enter your name here"></input>
            </div>
            <div className="mb-3">
                <h5 className="form-label" id="fnt">Message: </h5>
                <input type="text" className="form-control" id="message" placeholder="Enter Message"></input>
            </div>
            <button type="submit" className="btn btn-primary" disabled={!state.contract}>Donate</button>
        </form>
    </div>
    </>
    ); 
};

export default Donate;  