//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol";

import "./util/Random.sol";

import "hardhat/console.sol";

contract TrickOrTreat is AccessControlUpgradeable {
    using EnumerableSetUpgradeable for EnumerableSetUpgradeable.UintSet;

    bytes32 public constant DOORMAN = keccak256("DOORMAN");

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

    struct NFTTreats {
        address contractAddress;
        uint256 tokenId;
        uint16 treats;
    }

    // place+visitor hash => timestamp
    mapping (uint256 => uint256) public placeVisits;
    // visitor+day hash => number of visits
    mapping (uint256 => uint8) public dailyVisits;
    // visitor hash => number of treats
    mapping (uint256 => uint16) public treats;

    // visitor hashes, so we can iterate and retrieve treats count
    EnumerableSetUpgradeable.UintSet internal visitors;
    // visitor hash to NFT
    mapping (uint256 => NFT) public visitorHashes;

    event Tricked(address indexed visitorContractAddress, uint256 indexed visitorTokenId, uint16 amount);
    event Treated(address indexed visitorContractAddress, uint256 indexed visitorTokenId, uint16 amount);

    function initialize() public initializer {
        __AccessControl_init();
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function getVisitorHash(NFT memory visitor) public pure returns (uint256) {
        return uint256(keccak256(abi.encode(visitor.contractAddress, visitor.tokenId)));
    }

    function getVisitorTodayHash(NFT memory visitor) public view returns (uint256) {
        return uint256(keccak256(abi.encode(visitor.contractAddress, visitor.tokenId, block.timestamp / 1 days)));
    }

    function getPlaceVisitHash(NFT memory visitor, NFT memory place) public pure returns (uint256) {
        return uint256(keccak256(abi.encode(visitor.contractAddress, visitor.tokenId, place.contractAddress, place.tokenId)));
    }

    function bagContents(NFT memory visitor) public view returns (uint16) {
        uint256 visitorHash = getVisitorHash(visitor);
        return treats[visitorHash];
    }

    function canRingDoorbell(NFT memory visitor, NFT memory place) public view {
        // Our backend will determine if the visitor and place are valid addresses pointing to
        // allowed NFTs on Ethereum mainnet and that the wallet owns the visitor.

        // Check if wallet has already done enough trick or treating
        uint256 visitorHash = getVisitorHash(visitor);
        require(treats[visitorHash] < 500, "PUMPKIN__BAG_FULL");

        uint256 visitorTodayHash = getVisitorTodayHash(visitor);
        require(dailyVisits[visitorTodayHash] < 12, "PUMPKIN__TOO_TIRED");

        // Check if visitor has already been to place today
        uint256 placeVisitHash = getPlaceVisitHash(visitor, place);
        require(block.timestamp - placeVisits[placeVisitHash] > 16 hours, "PUMPKIN__ALREADY_VISITED_TODAY");

        // Check if anyone is home today
        // 
        // I _really_ wanted this check to consume a daily visit but I'm having to restructure
        // this contract a bit to make it easier to retrieve these revert codes when passing
        // around a transaction hash. Maybe I'll do something more complicated in the future,
        // but this does the trick for now for this silly game.
        uint256 isAnyoneHomeToday = uint256(keccak256(abi.encode(place.contractAddress, place.tokenId, block.timestamp / 1 days)));
        require(isAnyoneHomeToday % 8 != 0, "PUMPKIN__NO_ANSWER");
    }

    function ringDoorbell(NFT memory visitor, NFT memory place) public onlyRole(DOORMAN) {
        canRingDoorbell(visitor, place);

        uint256 visitorHash = getVisitorHash(visitor);
        uint256 visitorTodayHash = getVisitorTodayHash(visitor);
        uint256 placeVisitHash = getPlaceVisitHash(visitor, place);

        dailyVisits[visitorTodayHash] += 1;
        placeVisits[placeVisitHash] = block.timestamp;

        uint16 amount = uint16(Random.random() % 5 + 1);

        if (Random.random() % 6 == 0 && treats[visitorHash] > 0) {
            amount = amount > treats[visitorHash] ? treats[visitorHash] : amount;
            treats[visitorHash] = treats[visitorHash] - amount;
            addVisitor(visitor);
            emit Tricked(visitor.contractAddress, visitor.tokenId, amount);
        }
        else {
            treats[visitorHash] = treats[visitorHash] + amount;
            addVisitor(visitor);
            emit Treated(visitor.contractAddress, visitor.tokenId, amount);
        }
    }

    function hasVisitedBefore(NFT memory visitor) public view returns (bool) {
        uint256 visitorHash = getVisitorHash(visitor);
        return visitors.contains(visitorHash);
    }

    function addVisitor(NFT memory visitor) public onlyRole(DEFAULT_ADMIN_ROLE) {
        uint256 visitorHash = getVisitorHash(visitor);
        visitors.add(visitorHash);
        visitorHashes[visitorHash] = visitor;
    }

    function addVisitors(NFT[] memory _visitors) public onlyRole(DEFAULT_ADMIN_ROLE) {
        for (uint i = 0; i < _visitors.length; i++) {
            addVisitor(_visitors[i]);
        }
    }

    function listVisitors() public view returns (uint256[] memory) {
        return visitors.values();
    }
}
