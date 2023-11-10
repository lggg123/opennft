// Change this line in the main script
import { storeMultipleAssets } from './store-asset.mjs';
import { CONTRACT_ADDRESS } from './deploy-contract.js';

async function mintNFTs(contractAddress, metadataUrls) {
    const BatchNFTs = await ethers.getContractFactory("BatchNFTs")
    const [owner] = await ethers.getSigners()
    const contract =  BatchNFTs.attach(contractAddress);
    
    for (let i  = 0; i < metadataUrls.length; i++) {
        await contract.BatchNFTs(owner.address, [metadataUrls[i]]);
        console.log(`NFT ${i + 1} minted to: `, owner.address);
        // NFT minted to:  0xEA3AF2F7fC9FD23DAEa15D8d5E38B510E6830780
    }
}

storeMultipleAssets()
    .then((metadataUrls) => {
        mintNFTs(CONTRACT_ADDRESS, metadataUrls)
            .then(() => process.exit(0))
            .catch((error) => {
                console.error(error);
                process.exit(1);
            });
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });