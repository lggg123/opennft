const CONTRACT_ADDRESS = "0xe9d78362EB96Ce134a6380a8777303C50Bd88311"
const META_DATA_URL = "ipfs://bafyreiekjyftfzza4usx622lopihngfsuppkjzmxtp3w7hzgfjk53uymuy/metadata.json"

async function mintNFT(contractAddress, metaDataURL) {
    const VibrantzNFT = await ethers.getContractFactory("VibrantzNFT")
    const [owner] = await ethers.getSigners()
    await VibrantzNFT.attach(contractAddress).mintNFT(owner.address, metaDataURL)
    console.log("NFT minted to: ", owner.address)
    // NFT minted to:  0xEA3AF2F7fC9FD23DAEa15D8d5E38B510E6830780
}

mintNFT(CONTRACT_ADDRESS, META_DATA_URL)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });