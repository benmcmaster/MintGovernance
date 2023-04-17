const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {

    const [owner] = await ethers.getSigners();

    // get token contract from address
    const tokenContractAddress = process.env.TOKEN_CONTRACT_ADDRESS;
    const tokenContract = await ethers.getContractAt("MyToken", tokenContractAddress);

    // get the balance of votes of the owner
    const votesBalanceBefore = await tokenContract.getVotes(owner.address);
    console.log("votesBalanceBefore: ", votesBalanceBefore.toString());
   
    const tx = await tokenContract.delegate(owner.address);
    console.log("tx: ", tx);

    const receipt = await tx.wait();
    console.log("receipt: ", receipt);

    const votesBalanceAfter = await tokenContract.getVotes(owner.address);
    console.log("votesBalanceAfter: ", votesBalanceAfter.toString());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
