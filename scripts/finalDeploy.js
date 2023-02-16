const hre = require("hardhat");

async function main() {
 
    const DonateToCreator = await hre.ethers.getContractFactory("DonateToCreator"); 
    const contract = await DonateToCreator.deploy(); // this is instance of our contract
  
    await contract.deployed(); 
    console.log("Address of Contract: ", contract.address); // print address of const contract declared above  
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  