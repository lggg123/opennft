// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BatchNFTs is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Smildeozduz", "SMTYLZ") {}

    function batchMintNFTs(address recipient, string[] memory tokenURIs)
        public onlyOwner
    {
        require(tokenURIs.length > 0, "No token URIs provided");

        for (uint256 i = 0; i < tokenURIs.length; i++) {
            _tokenIds.increment();

            uint256 newItemId = _tokenIds.current();
            _mint(recipient, newItemId);
            _setTokenURI(newItemId, tokenURIs[i]);
        }
    }
}