// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MyToken is ERC721, ERC721URIStorage, Ownable, ERC721Enumerable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    mapping(string => uint8) existingURIs;

    mapping(address => uint256) balances;

    constructor() ERC721("MyToken", "ABC") {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function isContentOwned(string memory uri) public view returns (bool) {
        return existingURIs[uri] == 1;
    }

    function payToMint(
        address recipient,
        string memory metadataURI
    ) public payable returns (uint256) {
        require (existingURIs[metadataURI] != 1, "NFT already minted!");
        require (msg.value >= 0.05 ether, "Need to pay up!");

        uint256 newItemId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        existingURIs[metadataURI] = 1;

        _mint(recipient, newItemId);
        _setTokenURI(newItemId, metadataURI);

        balances[recipient]++;
        // console.log(balances.toString());
        console.log("recipient: ", recipient);
        console.log("balances of the recipient:", balances[recipient]);
        return newItemId;
    }

    function listUserNFTs(address contractAddress, address owner) external view returns (uint256[] memory) {

        uint256 balance = IERC721Enumerable(contractAddress).balanceOf(owner);
        console.log(balance);
        uint256[] memory tokens = new uint256[](balance);

        for (uint256 i=0; i<balance; i++) {
            console.log(i);
            // console.log(IERC721Enumerable(contractAddress).tokenOfOwnerByIndex(owner, i));
            // console.log(tokenOfOwnerByIndex(owner, i));
            // tokens[i] = IERC721Enumerable(contractAddress).tokenOfOwnerByIndex(owner, i);
            tokens[i] = tokenOfOwnerByIndex(owner, i);
        }
        
        return tokens;
    }

    function getTokenIds(address contractAddress, address _owner) public view returns (uint[] memory) {
        uint[] memory _tokensOfOwner = new uint[](ERC721.balanceOf(_owner));
        uint i;

        for (i=0;i<ERC721.balanceOf(_owner);i++){
            _tokensOfOwner[i] = IERC721Enumerable(contractAddress).tokenOfOwnerByIndex(_owner, i);
        }
        return (_tokensOfOwner);
    }

    function ownerOfTokenIds(address contractAddress, address tokenOwner) external view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](balanceOf(tokenOwner));
        uint256 counter = 0;
        for (uint256 i = 0; i < balanceOf(tokenOwner); i++) {
            if (ownerOf(i) == tokenOwner) {
                // result[counter] = i;
                // counter++;
                // console.log("test", IERC721Enumerable(contractAddress).tokenOfOwnerByIndex(tokenOwner, i));
                result[i] = IERC721Enumerable(contractAddress).tokenOfOwnerByIndex(tokenOwner, i);
                // result[i] = tokenOfOwnerByIndex(tokenOwner, i);
            }
        }
        return result;
    }

    function getBalancesOfUser(address user) external view returns (uint256) {
        return balances[user];
    }
}