/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TrickOrTreat, TrickOrTreatInterface } from "../TrickOrTreat";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "visitorContractAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "visitorTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "amount",
        type: "uint16",
      },
    ],
    name: "Treated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "visitorContractAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "visitorTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "amount",
        type: "uint16",
      },
    ],
    name: "Tricked",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DOORMAN",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        internalType: "struct TrickOrTreat.NFT",
        name: "visitor",
        type: "tuple",
      },
    ],
    name: "addVisitor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        internalType: "struct TrickOrTreat.NFT[]",
        name: "_visitors",
        type: "tuple[]",
      },
    ],
    name: "addVisitors",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        internalType: "struct TrickOrTreat.NFT",
        name: "visitor",
        type: "tuple",
      },
    ],
    name: "bagContents",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        internalType: "struct TrickOrTreat.NFT",
        name: "visitor",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        internalType: "struct TrickOrTreat.NFT",
        name: "place",
        type: "tuple",
      },
    ],
    name: "canRingDoorbell",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "dailyVisits",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        internalType: "struct TrickOrTreat.NFT",
        name: "visitor",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        internalType: "struct TrickOrTreat.NFT",
        name: "place",
        type: "tuple",
      },
    ],
    name: "getPlaceVisitHash",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        internalType: "struct TrickOrTreat.NFT",
        name: "visitor",
        type: "tuple",
      },
    ],
    name: "getVisitorHash",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        internalType: "struct TrickOrTreat.NFT",
        name: "visitor",
        type: "tuple",
      },
    ],
    name: "getVisitorTodayHash",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        internalType: "struct TrickOrTreat.NFT",
        name: "visitor",
        type: "tuple",
      },
    ],
    name: "hasVisitedBefore",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "listVisitors",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "placeVisits",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        internalType: "struct TrickOrTreat.NFT",
        name: "visitor",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        internalType: "struct TrickOrTreat.NFT",
        name: "place",
        type: "tuple",
      },
    ],
    name: "ringDoorbell",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "treats",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "visitorHashes",
    outputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061299b806100206000396000f3fe608060405234801561001057600080fd5b506004361061014c5760003560e01c80636578210d116100c3578063b1d8a3401161007c578063b1d8a340146103e8578063be4d04ca14610418578063c171363414610434578063c600ee2c14610464578063d547741f14610480578063fed4b4ea1461049c5761014c565b80636578210d146102ff57806379e16d0c1461032f5780638129fc1c1461035f57806391d1485414610369578063957b0fd914610399578063a217fddf146103ca5761014c565b8063248a9ca311610115578063248a9ca31461022d578063280fd18d1461025d5780632f2ff15d1461027b578063311d3bd21461029757806336568abe146102b35780635c34e7b0146102cf5761014c565b806210b5851461015157806301ffc9a71461018157806309331359146101b15780630b86abcd146101e15780630e5b1a7914610211575b600080fd5b61016b60048036038101906101669190611c99565b6104ba565b6040516101789190612249565b60405180910390f35b61019b60048036038101906101969190611c70565b6104f2565b6040516101a89190612111565b60405180910390f35b6101cb60048036038101906101c69190611c99565b61056c565b6040516101d89190612111565b60405180910390f35b6101fb60048036038101906101f69190611c99565b610596565b6040516102089190612264565b60405180910390f35b61022b60048036038101906102269190611bca565b6105d3565b005b61024760048036038101906102429190611c0b565b610655565b604051610254919061212c565b60405180910390f35b610265610675565b60405161027291906120ef565b60405180910390f35b61029560048036038101906102909190611c34565b610686565b005b6102b160048036038101906102ac9190611cc2565b6106af565b005b6102cd60048036038101906102c89190611c34565b6108a8565b005b6102e960048036038101906102e49190611cfe565b61092b565b6040516102f6919061227f565b60405180910390f35b61031960048036038101906103149190611cc2565b61094b565b6040516103269190612264565b60405180910390f35b61034960048036038101906103449190611cfe565b610995565b6040516103569190612249565b60405180910390f35b6103676109b6565b005b610383600480360381019061037e9190611c34565b610aa4565b6040516103909190612111565b60405180910390f35b6103b360048036038101906103ae9190611cfe565b610b0f565b6040516103c192919061204a565b60405180910390f35b6103d2610b53565b6040516103df919061212c565b60405180910390f35b61040260048036038101906103fd9190611cfe565b610b5a565b60405161040f9190612264565b60405180910390f35b610432600480360381019061042d9190611cc2565b610b72565b005b61044e60048036038101906104499190611c99565b610e85565b60405161045b9190612264565b60405180910390f35b61047e60048036038101906104799190611c99565b610ed2565b005b61049a60048036038101906104959190611c34565b610f76565b005b6104a4610f9f565b6040516104b1919061212c565b60405180910390f35b6000806104c683610596565b90506099600082815260200190815260200160002060009054906101000a900461ffff16915050919050565b60007f7965db0b000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480610565575061056482610fc3565b5b9050919050565b60008061057883610596565b905061058e81609a61102d90919063ffffffff16565b915050919050565b6000816000015182602001516040516020016105b392919061204a565b6040516020818303038152906040528051906020012060001c9050919050565b6000801b6105e8816105e3611047565b61104f565b60005b82518110156106505761063d838281518110610630577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010151610ed2565b80806106489061262a565b9150506105eb565b505050565b600060656000838152602001908152602001600020600101549050919050565b6060610681609a6110ec565b905090565b61068f82610655565b6106a08161069b611047565b61104f565b6106aa838361110d565b505050565b60006106ba83610596565b90506101f46099600083815260200190815260200160002060009054906101000a900461ffff1661ffff1610610725576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161071c90612189565b60405180910390fd5b600061073084610e85565b9050600c6098600083815260200190815260200160002060009054906101000a900460ff1660ff1610610798576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078f906121c9565b60405180910390fd5b60006107a4858561094b565b905061e1006097600083815260200190815260200160002054426107c891906124cf565b11610808576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107ff906121a9565b60405180910390fd5b60008460000151856020015162015180426108239190612410565b604051602001610835939291906120b8565b6040516020818303038152906040528051906020012060001c9050600060088261085f919061267d565b14156108a0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161089790612209565b60405180910390fd5b505050505050565b6108b0611047565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461091d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161091490612229565b60405180910390fd5b61092782826111ee565b5050565b60986020528060005260406000206000915054906101000a900460ff1681565b600082600001518360200151836000015184602001516040516020016109749493929190612073565b6040516020818303038152906040528051906020012060001c905092915050565b60996020528060005260406000206000915054906101000a900461ffff1681565b600060019054906101000a900460ff16806109dc575060008054906101000a900460ff16155b610a1b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a12906121e9565b60405180910390fd5b60008060019054906101000a900460ff161590508015610a6b576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b610a736112d0565b610a806000801b336113c1565b8015610aa15760008060016101000a81548160ff0219169083151502179055505b50565b60006065600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b609c6020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154905082565b6000801b81565b60976020528060005260406000206000915090505481565b7f86963f192fc176491b7bfa89b708538409f462c751c0ec1af0c0d95c9ddb801d610ba481610b9f611047565b61104f565b610bae83836106af565b6000610bb984610596565b90506000610bc685610e85565b90506000610bd4868661094b565b905060016098600084815260200190815260200160002060008282829054906101000a900460ff16610c0691906123d9565b92506101000a81548160ff021916908360ff160217905550426097600083815260200190815260200160002081905550600060016005610c446113cf565b610c4e919061267d565b610c589190612383565b905060006006610c666113cf565b610c70919061267d565b148015610ca2575060006099600086815260200190815260200160002060009054906101000a900461ffff1661ffff16115b15610dc1576099600085815260200190815260200160002060009054906101000a900461ffff1661ffff168161ffff1611610cdd5780610d00565b6099600085815260200190815260200160002060009054906101000a900461ffff165b9050806099600086815260200190815260200160002060009054906101000a900461ffff16610d2f919061249b565b6099600086815260200190815260200160002060006101000a81548161ffff021916908361ffff160217905550610d6587610ed2565b8660200151876000015173ffffffffffffffffffffffffffffffffffffffff167f23b9b2d476d90a64ac2a5a600191d156df7c67f5bbbb4ca2a0896359a1ab0b3083604051610db49190612249565b60405180910390a3610e7c565b806099600086815260200190815260200160002060009054906101000a900461ffff16610dee919061234b565b6099600086815260200190815260200160002060006101000a81548161ffff021916908361ffff160217905550610e2487610ed2565b8660200151876000015173ffffffffffffffffffffffffffffffffffffffff167fcc049c6e74d28eb24241b9d85bef4d22e1fddec17be61d05c8d5ce29afa3e93883604051610e739190612249565b60405180910390a35b50505050505050565b6000816000015182602001516201518042610ea09190612410565b604051602001610eb2939291906120b8565b6040516020818303038152906040528051906020012060001c9050919050565b6000801b610ee781610ee2611047565b61104f565b6000610ef283610596565b9050610f0881609a61140690919063ffffffff16565b5082609c600083815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155905050505050565b610f7f82610655565b610f9081610f8b611047565b61104f565b610f9a83836111ee565b505050565b7f86963f192fc176491b7bfa89b708538409f462c751c0ec1af0c0d95c9ddb801d81565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600061103f836000018360001b611420565b905092915050565b600033905090565b6110598282610aa4565b6110e85761107e8173ffffffffffffffffffffffffffffffffffffffff166014611443565b61108c8360001c6020611443565b60405160200161109d929190611fc2565b6040516020818303038152906040526040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110df9190612147565b60405180910390fd5b5050565b606060006110fc8360000161173d565b905060608190508092505050919050565b6111178282610aa4565b6111ea5760016065600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555061118f611047565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b6111f88282610aa4565b156112cc5760006065600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550611271611047565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45b5050565b600060019054906101000a900460ff16806112f6575060008054906101000a900460ff16155b611335576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161132c906121e9565b60405180910390fd5b60008060019054906101000a900460ff161590508015611385576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b61138d611799565b611395611872565b61139d61194b565b80156113be5760008060016101000a81548160ff0219169083151502179055505b50565b6113cb828261110d565b5050565b60004342445a6040516020016113e89493929190611ffc565b6040516020818303038152906040528051906020012060001c905090565b6000611418836000018360001b611a24565b905092915050565b600080836001016000848152602001908152602001600020541415905092915050565b6060600060028360026114569190612441565b6114609190612383565b67ffffffffffffffff81111561149f577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156114d15781602001600182028036833780820191505090505b5090507f30000000000000000000000000000000000000000000000000000000000000008160008151811061152f577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f7800000000000000000000000000000000000000000000000000000000000000816001815181106115b9577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600060018460026115f99190612441565b6116039190612383565b90505b60018111156116ef577f3031323334353637383961626364656600000000000000000000000000000000600f86166010811061166b577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b1a60f81b8282815181106116a8577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600485901c9450806116e8906125cf565b9050611606565b5060008414611733576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161172a90612169565b60405180910390fd5b8091505092915050565b60608160000180548060200260200160405190810160405280929190818152602001828054801561178d57602002820191906000526020600020905b815481526020019060010190808311611779575b50505050509050919050565b600060019054906101000a900460ff16806117bf575060008054906101000a900460ff16155b6117fe576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117f5906121e9565b60405180910390fd5b60008060019054906101000a900460ff16159050801561184e576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b801561186f5760008060016101000a81548160ff0219169083151502179055505b50565b600060019054906101000a900460ff1680611898575060008054906101000a900460ff16155b6118d7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118ce906121e9565b60405180910390fd5b60008060019054906101000a900460ff161590508015611927576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b80156119485760008060016101000a81548160ff0219169083151502179055505b50565b600060019054906101000a900460ff1680611971575060008054906101000a900460ff16155b6119b0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119a7906121e9565b60405180910390fd5b60008060019054906101000a900460ff161590508015611a00576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b8015611a215760008060016101000a81548160ff0219169083151502179055505b50565b6000611a308383611420565b611a89578260000182908060018154018082558091505060019003906000526020600020016000909190919091505582600001805490508360010160008481526020019081526020016000208190555060019050611a8e565b600090505b92915050565b6000611aa7611aa2846122bf565b61229a565b90508083825260208201905082856040860282011115611ac657600080fd5b60005b85811015611af65781611adc8882611b69565b845260208401935060408301925050600181019050611ac9565b5050509392505050565b600081359050611b0f81612909565b92915050565b600082601f830112611b2657600080fd5b8135611b36848260208601611a94565b91505092915050565b600081359050611b4e81612920565b92915050565b600081359050611b6381612937565b92915050565b600060408284031215611b7b57600080fd5b611b85604061229a565b90506000611b9584828501611b00565b6000830152506020611ba984828501611bb5565b60208301525092915050565b600081359050611bc48161294e565b92915050565b600060208284031215611bdc57600080fd5b600082013567ffffffffffffffff811115611bf657600080fd5b611c0284828501611b15565b91505092915050565b600060208284031215611c1d57600080fd5b6000611c2b84828501611b3f565b91505092915050565b60008060408385031215611c4757600080fd5b6000611c5585828601611b3f565b9250506020611c6685828601611b00565b9150509250929050565b600060208284031215611c8257600080fd5b6000611c9084828501611b54565b91505092915050565b600060408284031215611cab57600080fd5b6000611cb984828501611b69565b91505092915050565b60008060808385031215611cd557600080fd5b6000611ce385828601611b69565b9250506040611cf485828601611b69565b9150509250929050565b600060208284031215611d1057600080fd5b6000611d1e84828501611bb5565b91505092915050565b6000611d338383611f7e565b60208301905092915050565b611d4881612503565b82525050565b6000611d59826122fb565b611d63818561231e565b9350611d6e836122eb565b8060005b83811015611d9f578151611d868882611d27565b9750611d9183612311565b925050600181019050611d72565b5085935050505092915050565b611db581612515565b82525050565b611dc481612521565b82525050565b6000611dd582612306565b611ddf818561232f565b9350611def81856020860161259c565b611df88161273b565b840191505092915050565b6000611e0e82612306565b611e188185612340565b9350611e2881856020860161259c565b80840191505092915050565b6000611e4160208361232f565b9150611e4c8261274c565b602082019050919050565b6000611e6460118361232f565b9150611e6f82612775565b602082019050919050565b6000611e87601e8361232f565b9150611e928261279e565b602082019050919050565b6000611eaa60128361232f565b9150611eb5826127c7565b602082019050919050565b6000611ecd602e8361232f565b9150611ed8826127f0565b604082019050919050565b6000611ef060128361232f565b9150611efb8261283f565b602082019050919050565b6000611f13601783612340565b9150611f1e82612868565b601782019050919050565b6000611f36601183612340565b9150611f4182612891565b601182019050919050565b6000611f59602f8361232f565b9150611f64826128ba565b604082019050919050565b611f7881612557565b82525050565b611f8781612585565b82525050565b611f9681612585565b82525050565b611fad611fa882612585565b612673565b82525050565b611fbc8161258f565b82525050565b6000611fcd82611f06565b9150611fd98285611e03565b9150611fe482611f29565b9150611ff08284611e03565b91508190509392505050565b60006120088287611f9c565b6020820191506120188286611f9c565b6020820191506120288285611f9c565b6020820191506120388284611f9c565b60208201915081905095945050505050565b600060408201905061205f6000830185611d3f565b61206c6020830184611f8d565b9392505050565b60006080820190506120886000830187611d3f565b6120956020830186611f8d565b6120a26040830185611d3f565b6120af6060830184611f8d565b95945050505050565b60006060820190506120cd6000830186611d3f565b6120da6020830185611f8d565b6120e76040830184611f8d565b949350505050565b600060208201905081810360008301526121098184611d4e565b905092915050565b60006020820190506121266000830184611dac565b92915050565b60006020820190506121416000830184611dbb565b92915050565b600060208201905081810360008301526121618184611dca565b905092915050565b6000602082019050818103600083015261218281611e34565b9050919050565b600060208201905081810360008301526121a281611e57565b9050919050565b600060208201905081810360008301526121c281611e7a565b9050919050565b600060208201905081810360008301526121e281611e9d565b9050919050565b6000602082019050818103600083015261220281611ec0565b9050919050565b6000602082019050818103600083015261222281611ee3565b9050919050565b6000602082019050818103600083015261224281611f4c565b9050919050565b600060208201905061225e6000830184611f6f565b92915050565b60006020820190506122796000830184611f8d565b92915050565b60006020820190506122946000830184611fb3565b92915050565b60006122a46122b5565b90506122b082826125f9565b919050565b6000604051905090565b600067ffffffffffffffff8211156122da576122d961270c565b5b602082029050602081019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b600061235682612557565b915061236183612557565b92508261ffff03821115612378576123776126ae565b5b828201905092915050565b600061238e82612585565b915061239983612585565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156123ce576123cd6126ae565b5b828201905092915050565b60006123e48261258f565b91506123ef8361258f565b92508260ff03821115612405576124046126ae565b5b828201905092915050565b600061241b82612585565b915061242683612585565b925082612436576124356126dd565b5b828204905092915050565b600061244c82612585565b915061245783612585565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156124905761248f6126ae565b5b828202905092915050565b60006124a682612557565b91506124b183612557565b9250828210156124c4576124c36126ae565b5b828203905092915050565b60006124da82612585565b91506124e583612585565b9250828210156124f8576124f76126ae565b5b828203905092915050565b600061250e82612565565b9050919050565b60008115159050919050565b6000819050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600061ffff82169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60005b838110156125ba57808201518184015260208101905061259f565b838111156125c9576000848401525b50505050565b60006125da82612585565b915060008214156125ee576125ed6126ae565b5b600182039050919050565b6126028261273b565b810181811067ffffffffffffffff821117156126215761262061270c565b5b80604052505050565b600061263582612585565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415612668576126676126ae565b5b600182019050919050565b6000819050919050565b600061268882612585565b915061269383612585565b9250826126a3576126a26126dd565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f537472696e67733a20686578206c656e67746820696e73756666696369656e74600082015250565b7f50554d504b494e5f5f4241475f46554c4c000000000000000000000000000000600082015250565b7f50554d504b494e5f5f414c52454144595f564953495445445f544f4441590000600082015250565b7f50554d504b494e5f5f544f4f5f54495245440000000000000000000000000000600082015250565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b7f50554d504b494e5f5f4e4f5f414e535745520000000000000000000000000000600082015250565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000600082015250565b7f206973206d697373696e6720726f6c6520000000000000000000000000000000600082015250565b7f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560008201527f20726f6c657320666f722073656c660000000000000000000000000000000000602082015250565b61291281612503565b811461291d57600080fd5b50565b61292981612521565b811461293457600080fd5b50565b6129408161252b565b811461294b57600080fd5b50565b61295781612585565b811461296257600080fd5b5056fea264697066735822122073935be88be751f17b8eb2e786716d141eae21d92710e14d99e61f8e63e0226364736f6c63430008040033";

export class TrickOrTreat__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TrickOrTreat> {
    return super.deploy(overrides || {}) as Promise<TrickOrTreat>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TrickOrTreat {
    return super.attach(address) as TrickOrTreat;
  }
  connect(signer: Signer): TrickOrTreat__factory {
    return super.connect(signer) as TrickOrTreat__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TrickOrTreatInterface {
    return new utils.Interface(_abi) as TrickOrTreatInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TrickOrTreat {
    return new Contract(address, _abi, signerOrProvider) as TrickOrTreat;
  }
}
