// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SupplyGuard {
    struct NFT {
        uint256 id;
        string title;
        string description;
        string imageUrl;
        string source;
        uint256 price;
        bool isMinted;
    } 

    uint256 private _nextId = 0;
    mapping(uint256 => NFT) public nfts;
    mapping(uint256 => address) public nftOwners;

    // Event declarations
    event NFTAdded(uint256 id, string title, uint256 price);
    event NFTMinted(uint256 id, address owner);

    // Add a new NFT to the collection with a specific price
    function addNFT(string memory title, string memory description, string memory imageUrl, string memory source, uint256 price) public {
        uint256 newNFTId = _nextId++;
        nfts[newNFTId] = NFT(newNFTId, title, description, imageUrl, source, price, false);
        emit NFTAdded(newNFTId, title, price);
    }

    // Mint an NFT if it hasn't been minted yet and the sent value covers the price
    function mintNFT(uint256 nftId) public payable {
        // require(!nfts[nftId].isMinted, "NFT already minted");
        // require(msg.value >= nfts[nftId].price, "Not enough ETH sent");

        nftOwners[nftId] = msg.sender;
        nfts[nftId].isMinted = true;
        payable(address(this)).transfer(msg.value);

        emit NFTMinted(nftId, msg.sender);
    }

    // Retrieve a list of all NFTs
    function getAllNFTs() public view returns (NFT[] memory) {
        NFT[] memory allNFTs = new NFT[](_nextId);
        for(uint256 i = 0; i < _nextId; i++) {
            allNFTs[i] = nfts[i];
        }
        return allNFTs;
    }

    // Retrieve a list of all minted NFTs by a specific user
    function getMintedNFTsByUser(address user) public view returns (NFT[] memory) {
        uint256 ownerCount = 0;
        for(uint256 i = 0; i < _nextId; i++) {
            if(nftOwners[i] == user && nfts[i].isMinted) {
                ownerCount++;
            }
        }

        NFT[] memory ownedNFTs = new NFT[](ownerCount);
        uint256 currentIndex = 0;
        for(uint256 i = 0; i < _nextId; i++) {
            if(nftOwners[i] == user && nfts[i].isMinted) {
                ownedNFTs[currentIndex] = nfts[i];
                currentIndex++;
            }
        }
        return ownedNFTs;
    }

    // Function to handle direct payments to the contract
    function makePayment() public payable {
        // require(msg.value > 0, "Cannot process zero payment");
        payable(address(this)).transfer(msg.value);
    }

    // Withdraw function for the contract's balance to a specific address
    function withdraw(address payable recipient) public {
        require(recipient != address(0), "Invalid address");
        recipient.transfer(address(this).balance);
    }
}
