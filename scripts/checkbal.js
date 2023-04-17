const { ethers } = require("hardhat");
require("dotenv").config();
const { parseEther } = ethers.utils;
const { keccak256, toUtf8Bytes } = require("ethers/lib/utils");

async function main() {
    const [owner] = await ethers.getSigners();

    // get token contract from address
    const tokenContractAddress = process.env.TOKEN_CONTRACT_ADDRESS;
    const tokenContract = await ethers.getContractAt("MyToken", tokenContractAddress);

    // get governor contract from address
    const governorContractAddress = process.env.GOVERNOR_CONTRACT_ADDRESS;
    const governorContract = await ethers.getContractAt("MyGovernor", governorContractAddress);

    // check owners balance of tokens on the token contract
    const balance = await tokenContract.balanceOf(owner.address);
    console.log("balance: ", balance.toString());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
