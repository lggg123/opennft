import { NFTStorage, File } from 'nft.storage'
import fs from 'fs'
import path from 'path'

const API_KEY = process.env.NFT_STORAGE_API_KEY
const client = new NFTStorage({ token: API_KEY })

async function readImagesFromFolder(folderPath) {
  return fs.promises.readdir(folderPath).then(fileNames => {
    return fileNames.map(fileName => path.join(folderPath, fileName));
  });
}

async function createMetadataForImage(imagePath) {
  const fileName = path.basename(imagePath);
  const imageBuffer = await fs.promises.readFile(imagePath);
  const imageFile = new File([imageBuffer], fileName, { type: 'image/jpeg' }); // Adjust the MIME type based on your images

  const metadata = {
    name: `Ghosertz #${fileName}`,
    description: `Step into the enigmatic world of Ghosterz, where the ethereal meets the digital in a mesmerizing dance of colors and forms. Each Ghosterz NFT is a unique digital artifact, a spectral embodiment of the mysteries hidden within the binary code of our online existence.

    Crafted with meticulous attention to detail, every Ghosterz piece is more than just a visual spectacle; it's a portal to a story untold, a glimpse into an alternate digital universe. The collection harmoniously blends abstract and figurative elements, creating a hauntingly beautiful symphony of pixels that resonates with the soul of the viewer.
    
    Ghosterz is not just an NFT collection; it's a journey through the digital afterlife, a testament to the ghosts we leave behind in the ever-expanding digital cosmos. Each piece in this collection symbolizes the fleeting yet indelible marks we make in our virtual lives, echoing through the corridors of cyberspace.
    
    Perfect for collectors and enthusiasts who appreciate art that transcends the ordinary, Ghosterz invites you to explore the depths of digital artistry. Owning a Ghosterz NFT is more than an investment; it's an adoption of a piece of the digital soul, a perpetual connection to the echo of creativity that thrives in the boundless realms of the internet.
    
    Join us in celebrating the unseen, the unheard, and the unspoken stories of the digital age with Ghosterz. Embrace the ghost within, and let your presence be felt beyond the physical world.`,
    image: imageFile,
    properties: {
      type: "Art Collection",
      origins: {

      },
      authors: [{ name: "George Lugo"}],
      content: {
        "text/markdown": "First NFT Collection Giveaway sweepstakes"
      }
    }
  };

  return metadata;
}

async function storeNFT(metadata) {
  try {
    const storedMetadata = await client.store(metadata);
    console.log('Stored NFT Metadata URI:', storedMetadata.url);
    return storedMetadata.url;
  } catch (error) {
    console.error('Failed to store NFT:', error);
  }
}

async function processImages(folderPath) {
  const imagePaths = await readImagesFromFolder(folderPath);
  for (let imagePath of imagePaths) {
    const metadata = await createMetadataForImage(imagePath);
    await storeNFT(metadata);
  }
}

const imagesFolderPath = './assets'; // Update this path to your images folder
processImages(imagesFolderPath);
