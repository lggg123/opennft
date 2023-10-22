// Metadata stores on Filecoin and IPFS with URL: ipfs://bafyreiekjyftfzza4usx622lopihngfsuppkjzmxtp3w7hzgfjk53uymuy/metadata.json

async function deployContract() {
    const BatchNFTs = await ethers.getContractFactory("BatchNFTs")
    const batchNFTs = await BatchNFTs.deploy()
    await batchNFTs.deployed()
    const txHash = batchNFTs.deployTransaction.hash
    const txReceipt = await ethers.provider.waitForTransaction(txHash)
    const contractAddress = txReceipt.contractAddress
    console.log("Contract deployed to address:", contractAddress)
}

// Contract deployed to address: 0x6eD9BF486785227c86A8E4792B73bE9a6ACee35D

deployContract()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

export { CONTRACT_ADDRESS }; // Export CONTRACT_ADDRESS