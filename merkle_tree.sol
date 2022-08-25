// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MerkleTree{
    bytes32 public merkleRoot;

    mapping(address => bool) public whitelistClaimed;

    function setRoot(bytes32 _merkleRoot) public{
        merkleRoot = _merkleRoot;
    }

    function whitelistClaim(bytes32[] calldata _merkleProof, address NFTAddress) public returns (string memory sentence){
        require(!whitelistClaimed[msg.sender], "Address already claimed");
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(
            MerkleProof.verify(_merkleProof, merkleRoot, leaf),
            "Invalid Merkle Proof."
        );
        whitelistClaimed[msg.sender] = true;
        return "NFT can be sent to the address";
    }
}
