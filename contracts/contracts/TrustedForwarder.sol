//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/metatx/MinimalForwarderUpgradeable.sol';

contract TrustedForwarder is OwnableUpgradeable, MinimalForwarderUpgradeable {
    function initialize() public initializer {
        __Ownable_init();
        __MinimalForwarder_init();
    }
}
