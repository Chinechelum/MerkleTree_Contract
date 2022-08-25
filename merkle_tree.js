
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

//dummy addresses from remix
let whitelistAddresses = [
    "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
    "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
    "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
    "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
    "0xdD870fA1b7C4700F2BD7f44238821C26f7392148"
  ];

const leafNodes = whitelistAddresses.map(addr => keccak256(addr));

const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});
console.log('Whitelist Merkle Tree\n', merkleTree.toString());

const rootHashBytes32 = '0x' + merkleTree.getRoot().toString('hex');
console.log("Root Hash (bytes 32): ", rootHashBytes32);

const claimingAddress = leafNodes[1];


const hexProof = merkleTree.getHexProof(claimingAddress);
console.log("Hex proof", hexProof);

console.log(merkleTree.verify(hexProof, claimingAddress, rootHash));
