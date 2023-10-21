# NFT minter to mint on Polygon blockchain

## Run yarn to install files

## Make sure the .env file is proper.

### Simply run yarn hardhat run scripts/store-asset.mjs this will store the NFT image to IPFS and the metadata that goes along with it.(copy the metadata url for ipfs and save it)

### Simply run yarn hardhat run scripts/deploy-contract.mjs --network Polygon (make sure to copy the address)

### Simply run yarn hardhat run scripts/mint-nft.mjs --network Polygon (before running make sure to change the address on mint-nft.mjs constant and the metadata url)

### Now the NFT will be minted and you can see it on the blockchain.