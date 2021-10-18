//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

library Random {
    function random() internal view returns (uint) {
        return uint(
            keccak256(
                abi.encodePacked(
                    block.number,
                    block.timestamp,
                    block.difficulty,
                    gasleft()
                )
            )
        );
    }
}
