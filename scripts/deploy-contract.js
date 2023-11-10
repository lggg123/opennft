const { ethers } = require("hardhat");

// Metadata stores on Filecoin and IPFS with URL: ipfs://bafyreiekjyftfzza4usx622lopihngfsuppkjzmxtp3w7hzgfjk53uymuy/metadata.json
let CONTRACT_ADDRESS;

async function deployContract() {
    const BatchNFTs = await ethers.getContractFactory("BatchNFTs")
    const batchNFTs = await BatchNFTs.deploy()
    await batchNFTs.deployed()
    const txHash = batchNFTs.deployTransaction.hash
    const txReceipt = await ethers.provider.waitForTransaction(txHash)
    CONTRACT_ADDRESS = txReceipt.contractAddress
    console.log("Contract deployed to address:", CONTRACT_ADDRESS)
}

deployContract()
    .then(() => {
        console.log("Contract Address: ", CONTRACT_ADDRESS);
        process.exit(0);
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

module.exports = { CONTRACT_ADDRESS }; // Export CONTRACT_ADDRESS