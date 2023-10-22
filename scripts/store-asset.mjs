import { NFTStorage, File } from "nft.storage"
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const { NFT_STORAGE_API_KEY } = process.env;
const metadataUrls = [];

async function storeAsset(imagePath, fileName) {
    const client = new NFTStorage({ token: NFT_STORAGE_API_KEY })
    const metadata = await client.store({
        name: fileName,
        description: 'A beautiful artistic collage!',
        collection: '',
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

    for (let i = 1; i <= numberOfAssets; i++) {
        const imagePath = `assets/image_${i}.png`; // Update the path to your images
        const fileName = `Image_${i}`;

        await storeAsset(imagePath, fileName);
    }

    return metadataUrls;
}

storeMultipleAssets()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });