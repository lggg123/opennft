import storeMultipleAssets from './store-asset.mjs';
import { CONTRACT_ADDRESS } from './deploy-contract.mjs';

async function mintNFTs(contractAddress, metaDataURLs) {
    const BatchNFTs = await ethers.getContractFactory("BatchNFTs")
    const [owner] = await ethers.getSigners()
    const contract =  BatchNFTs.attach(contractAddress);
    
    for (let i  = 0; i < metaDataURLs.length; i++) {
        await contract.BatchNFTs(owner.address, [metaDataURLs[i]]);
        console.log(`NFT ${i + 1} minted to: `, owner.address);
        // NFT minted to:  0xEA3AF2F7fC9FD23DAEa15D8d5E38B510E6830780
    }
}

storeMultipleAssets().then((metadataUrls) => {
    mintNFTs(CONTRACT_ADDRESS, metadataUrls)
        .then(() => process.exit(0))
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });
});