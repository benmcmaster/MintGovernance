const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {

  // Define the owner using the private key from the .env file
  // const privateKey = process.env.GOERLI_PRIVATE_KEY;
  // const wallet = new ethers.Wallet(privateKey);
  // const owner = wallet.connect(ethers.provider);

  const [owner] = await ethers.getSigners();

  // get the balance of the owner
  const balance = await owner.getBalance();
  console.log("Balance: ", balance.toString());


  const transactionCount = await owner.getTransactionCount();

  // gets the address of the token before it is deployed
  const futureAddress = ethers.utils.getContractAddress({
    from: owner.address,
    nonce: transactionCount + 1
  });

  const MyGovernor = await ethers.getContractFactory("MyGovernor");
  const governor = await MyGovernor.deploy(futureAddress);

  const MyToken = await ethers.getContractFactory("MyToken");
  const token = await MyToken.deploy(governor.address);

  console.log(
    `Governor deployed to ${governor.address}`,
    `Token deployed to ${token.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
