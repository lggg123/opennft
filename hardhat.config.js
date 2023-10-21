/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();
const { PRIVATE_KEY } = process.env
module.exports = {
  defaultNetwork: "Polygon",
  networks: {
    hardhat: {
    },
    Polygon: {
      url: "https://polygon-rpc.com",
      accounts: [PRIVATE_KEY]
    },
    PolygonMumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
