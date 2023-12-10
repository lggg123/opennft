// Import ethers from Hardhat package
const { ethers } = require("hardhat");

async function main() {
    try {
        const totalNfts = 2657;
        console.log('Running bulk_mint_nfts script...');

        const contractName = 'ArtCollectible'; // Contract name
        const contract_address = '0x5698a9624A1111B3ea5BCd37E899e29893C55c8D'; // Contract address

        // Get the contract factory and attach to already deployed contract
        const ArtCollectible = await ethers.getContractFactory(contractName);
        const artCollectible = await ArtCollectible.attach(contract_address);

        // Get the signer to perform transactions
        const [signer] = await ethers.getSigners();

        // NFT's to mint in each transaction
        const mintSize = 500;
        for (let i = 1; i <= totalNfts; i += mintSize) {
            let currentMintSize = Math.min(mintSize, totalNfts - i + 1);
            const ids = getTokenIds(i, currentMintSize);
            const amounts = getAmounts(currentMintSize);

            console.log('Token Ids to be minted in current batch => ', ids);
            console.log('Amounts to be minted for each Token Id in current batch => ', amounts);

            // Perform the mintBatch transaction
            await artCollectible.connect(signer).mintBatch(ids, amounts);
            console.log('successfully batch minted NFTs for current batch');
        }

        // Check balance for first tokenId
        const balance = await artCollectible.balanceOf(signer.address, 1);
        console.log('Balance of tokenId 1: ', balance.toString());
    } catch (e) {
        console.error(e);
    }
}

function getTokenIds(startTokenId, size) {
    return Array.from({ length: size }, (_, index) => index + startTokenId);
}

function getAmounts(size) {
    return Array(size).fill(1);
}

main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});
