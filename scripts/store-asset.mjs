import { NFTStorage, File } from "nft.storage"
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const { NFT_STORAGE_API_KEY } = process.env;

async function storeAsset(imagePath, fileName, metadataUrls) {
    const client = new NFTStorage({ token: NFT_STORAGE_API_KEY })
    const metadata = await client.store({
        name: fileName,
        description: 'A starter set of NFTs created using layers',
        collection: 'Strong Square Smile by George Alexander Lugo',
        image: new File(
            [await fs.promises.readFile(imagePath)],
            `${fileName}.png`,
            { type: 'image/png' }
        ),
    });
    const metadataUrl = metadata.url; // Store metadata URL
    metadataUrls.push(metadataUrl); // Add metadata URL to array
    console.log(`Metadata for ${fileName} stored on Filecoin and IPFS with URL:`, metadata.url)
}

async function storeMultipleAssets() {
    const numberOfAssets = 128;
    const metadataUrls = [];

    for (let i = 1; i <= numberOfAssets; i++) {
        const imagePath = `assets/${i}.png`; // Update the path to your images
        const fileName = `Starter #${i}`;

        await storeAsset(imagePath, fileName, metadataUrls);
    }

    return metadataUrls;
}

storeMultipleAssets()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

export { storeMultipleAssets };