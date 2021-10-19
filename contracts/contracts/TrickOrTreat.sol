//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import "./util/Random.sol";

import "hardhat/console.sol";

contract TrickOrTreat is OwnableUpgradeable {
    // I started with ERC-1155, but realized I wanted to store balances in relation to
    // an NFT rather than a wallet. Because an NFT is a contract address + token ID, we
    // need to do our own thing. Not great, but this approach let's us move.
    // 
    // One possible alternative is to generate a hash based on the NFT contract address
    // and token ID, and store ERC-1155 tokens on that. It wouldn't be a true address/wallet
    // and probably not worth attempting to hack.

    struct NFT {
        address contractAddress;
        uint256 tokenId;
    }

    // place+visitor hash => timestamp
    mapping (uint256 => uint256) public placeVisits;
    // visitor+day hash => number of visits
    mapping (uint256 => uint8) public dailyVisits;
    // visitor hash => number of treats
    mapping (uint256 => uint16) public treats;

    event Tricked(address indexed visitorContractAddress, uint256 indexed visitorTokenId, uint16 amount);
    event Treated(address indexed visitorContractAddress, uint256 indexed visitorTokenId, uint16 amount);

    function initialize() public initializer {
        __Ownable_init();
    }

    function getVisitorHash(NFT memory visitor) internal pure returns (uint256) {
        return uint256(keccak256(abi.encode(visitor.contractAddress, visitor.tokenId)));
    }

    function bagContents(NFT memory visitor) public view returns (uint16) {
        uint256 visitorHash = getVisitorHash(visitor);
        return treats[visitorHash];
    }

    function ringDoorbell(NFT memory visitor, NFT memory place) public onlyOwner {
        // Our backend will determine if the visitor and place are valid addresses pointing to
        // allowed NFTs on Ethereum mainnet and that the wallet owns the visitor.

        // Check if wallet has already done enough trick or treating
        uint256 visitorHash = getVisitorHash(visitor);
        require(treats[visitorHash] < 500, "PUMPKIN__BAG_FULL");

        uint256 visitorTodayHash = uint256(keccak256(abi.encode(visitor.contractAddress, visitor.tokenId, block.timestamp / 1 days)));
        require(dailyVisits[visitorTodayHash] < 12, "PUMPKIN__TOO_TIRED");

        // Check if visitor has already been to place today
        uint256 placeVisitHash = uint256(keccak256(abi.encode(visitor.contractAddress, visitor.tokenId, place.contractAddress, place.tokenId)));
        require(block.timestamp - placeVisits[placeVisitHash] > 16 hours, "PUMPKIN__ALREADY_VISITED_TODAY");

        dailyVisits[visitorTodayHash] += 1;
        placeVisits[placeVisitHash] = block.timestamp;

        // Check if anyone is home today
        uint256 isAnyoneHomeToday = uint256(keccak256(abi.encode(place.contractAddress, place.tokenId, block.timestamp / 1 days)));
        require(isAnyoneHomeToday % 8 != 0, "PUMPKIN__NO_ANSWER");


        uint16 amount = uint16(Random.random() % 5 + 1);

        if (Random.random() % 6 == 0 && treats[visitorHash] > 0) {
            amount = amount > treats[visitorHash] ? treats[visitorHash] : amount;
            treats[visitorHash] = treats[visitorHash] - amount;
            emit Tricked(visitor.contractAddress, visitor.tokenId, amount);
        }
        else {
            treats[visitorHash] = treats[visitorHash] + amount;
            emit Treated(visitor.contractAddress, visitor.tokenId, amount);
        }
    }
}
