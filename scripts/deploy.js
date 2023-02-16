// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
async function getBalances(address){
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);  
}

async function consoleBalances(addresses){
  let counter = 0 ; 
  for (const address of addresses){
    console.log(` Address ${counter} balance:`, await getBalances(address)); 
    counter++; 
  }
}

async function consoleDonors(donors){
  for (const Donor of donors){
    const timestamp=Donor.timestamp; 
    const name=Donor.name; 
    const DonorAddress=Donor.DonorAddress; 
    const message = Donor.message; 
  console.log(`DonatedAt ${timestamp}, name ${name}, DonorAddress ${DonorAddress}, message ${message}`); 
  }
}

async function main() {
  const[owner, donor1, donor2, donor3]= await hre.ethers.getSigners(); 
  const DonateToCreator = await hre.ethers.getContractFactory("DonateToCreator"); 
  const contract = await DonateToCreator.deploy(); // this is instance of our contract

  await contract.deployed(); 
  console.log("Address of Contract: ", contract.address); // print address of const contract declared above  

  const addresses = [owner.address, donor1.address, donor2.address, donor3.address];

  console.log("Before Donating "); 
  await consoleBalances(addresses);

  const amount = {value:hre.ethers.utils.parseEther("1")}
  await contract.connect(donor1).Donate("donor1", "Hello vro", amount); 
  await contract.connect(donor2).Donate("donor2", "Hello i am donor2", amount); 
  await contract.connect(donor3).Donate("donor3", "Hello vro i am donor3", amount); 

  console.log("After Donating "); 
  await consoleBalances(addresses); 

  const donors = await contract.getDonorInfo();  
  consoleDonors(donors);  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
