// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract DonateToCreator{

struct Donor{
    string name; 
    string message; 
    uint timestamp; 
    address DonorAddress; 
}

Donor[] donors;  
address payable owner; 

constructor(){
    owner= payable(msg.sender); 
}
function Donate(string memory name , string memory message) public payable{
    require(msg.value>0, "Please pay a value greater than 0"); 
    owner.transfer(msg.value); 
    donors.push(Donor(name, message, block.timestamp, msg.sender)); 
}

function getDonorInfo() public view returns(Donor[] memory){
    return donors; 
}

}