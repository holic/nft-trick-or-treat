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
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061224f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100e95760003560e01c80638129fc1c1161008c578063b1d8a34011610066578063b1d8a3401461026e578063be4d04ca1461029e578063d547741f146102ba578063fed4b4ea146102d6576100e9565b80638129fc1c1461021657806391d1485414610220578063a217fddf14610250576100e9565b80632f2ff15d116100c85780632f2ff15d1461017e57806336568abe1461019a5780635c34e7b0146101b657806379e16d0c146101e6576100e9565b806210b585146100ee57806301ffc9a71461011e578063248a9ca31461014e575b600080fd5b610108600480360381019061010391906116a2565b6102f4565b6040516101159190611bab565b60405180910390f35b61013860048036038101906101339190611679565b61032c565b6040516101459190611a73565b60405180910390f35b61016860048036038101906101639190611614565b6103a6565b6040516101759190611a8e565b60405180910390f35b6101986004803603810190610193919061163d565b6103c6565b005b6101b460048036038101906101af919061163d565b6103ef565b005b6101d060048036038101906101cb9190611707565b610472565b6040516101dd9190611be1565b60405180910390f35b61020060048036038101906101fb9190611707565b610492565b60405161020d9190611bab565b60405180910390f35b61021e6104b3565b005b61023a6004803603810190610235919061163d565b6105a1565b6040516102479190611a73565b60405180910390f35b61025861060c565b6040516102659190611a8e565b60405180910390f35b61028860048036038101906102839190611707565b610613565b6040516102959190611bc6565b60405180910390f35b6102b860048036038101906102b391906116cb565b61062b565b005b6102d460048036038101906102cf919061163d565b610b5d565b005b6102de610b86565b6040516102eb9190611a8e565b60405180910390f35b60008061030083610baa565b90506099600082815260200190815260200160002060009054906101000a900461ffff16915050919050565b60007f7965db0b000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061039f575061039e82610be7565b5b9050919050565b600060656000838152602001908152602001600020600101549050919050565b6103cf826103a6565b6103e0816103db610c51565b610c59565b6103ea8383610cf6565b505050565b6103f7610c51565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610464576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161045b90611b8b565b60405180910390fd5b61046e8282610dd7565b5050565b60986020528060005260406000206000915054906101000a900460ff1681565b60996020528060005260406000206000915054906101000a900461ffff1681565b600060019054906101000a900460ff16806104d9575060008054906101000a900460ff16155b610518576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161050f90611b4b565b60405180910390fd5b60008060019054906101000a900460ff161590508015610568576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b610570610eb9565b61057d6000801b33610faa565b801561059e5760008060016101000a81548160ff0219169083151502179055505b50565b60006065600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6000801b81565b60976020528060005260406000206000915090505481565b7f86963f192fc176491b7bfa89b708538409f462c751c0ec1af0c0d95c9ddb801d61065d81610658610c51565b610c59565b600061066884610baa565b90506101f46099600083815260200190815260200160002060009054906101000a900461ffff1661ffff16106106d3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106ca90611aeb565b60405180910390fd5b60008460000151856020015162015180426106ee9190611d0d565b60405160200161070093929190611a3c565b6040516020818303038152906040528051906020012060001c9050600c6098600083815260200190815260200160002060009054906101000a900460ff1660ff1610610781576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161077890611b2b565b60405180910390fd5b600085600001518660200151866000015187602001516040516020016107aa94939291906119f7565b6040516020818303038152906040528051906020012060001c905061e1006097600083815260200190815260200160002054426107e79190611dcc565b11610827576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161081e90611b0b565b60405180910390fd5b60016098600084815260200190815260200160002060008282829054906101000a900460ff166108579190611cd6565b92506101000a81548160ff021916908360ff16021790555042609760008381526020019081526020016000208190555060008560000151866020015162015180426108a29190611d0d565b6040516020016108b493929190611a3c565b6040516020818303038152906040528051906020012060001c905060006008826108de9190611f31565b141561091f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161091690611b6b565b60405180910390fd5b60006001600561092d610fb8565b6109379190611f31565b6109419190611c80565b90506000600661094f610fb8565b6109599190611f31565b14801561098b575060006099600087815260200190815260200160002060009054906101000a900461ffff1661ffff16115b15610aa1576099600086815260200190815260200160002060009054906101000a900461ffff1661ffff168161ffff16116109c657806109e9565b6099600086815260200190815260200160002060009054906101000a900461ffff165b9050806099600087815260200190815260200160002060009054906101000a900461ffff16610a189190611d98565b6099600087815260200190815260200160002060006101000a81548161ffff021916908361ffff1602179055508760200151886000015173ffffffffffffffffffffffffffffffffffffffff167f23b9b2d476d90a64ac2a5a600191d156df7c67f5bbbb4ca2a0896359a1ab0b3083604051610a949190611bab565b60405180910390a3610b53565b806099600087815260200190815260200160002060009054906101000a900461ffff16610ace9190611c48565b6099600087815260200190815260200160002060006101000a81548161ffff021916908361ffff1602179055508760200151886000015173ffffffffffffffffffffffffffffffffffffffff167fcc049c6e74d28eb24241b9d85bef4d22e1fddec17be61d05c8d5ce29afa3e93883604051610b4a9190611bab565b60405180910390a35b5050505050505050565b610b66826103a6565b610b7781610b72610c51565b610c59565b610b818383610dd7565b505050565b7f86963f192fc176491b7bfa89b708538409f462c751c0ec1af0c0d95c9ddb801d81565b600081600001518260200151604051602001610bc79291906119ce565b6040516020818303038152906040528051906020012060001c9050919050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600033905090565b610c6382826105a1565b610cf257610c888173ffffffffffffffffffffffffffffffffffffffff166014610fef565b610c968360001c6020610fef565b604051602001610ca7929190611946565b6040516020818303038152906040526040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ce99190611aa9565b60405180910390fd5b5050565b610d0082826105a1565b610dd35760016065600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550610d78610c51565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b610de182826105a1565b15610eb55760006065600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550610e5a610c51565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45b5050565b600060019054906101000a900460ff1680610edf575060008054906101000a900460ff16155b610f1e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f1590611b4b565b60405180910390fd5b60008060019054906101000a900460ff161590508015610f6e576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b610f766112e9565b610f7e6113c2565b610f8661149b565b8015610fa75760008060016101000a81548160ff0219169083151502179055505b50565b610fb48282610cf6565b5050565b60004342445a604051602001610fd19493929190611980565b6040516020818303038152906040528051906020012060001c905090565b6060600060028360026110029190611d3e565b61100c9190611c80565b67ffffffffffffffff81111561104b577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280601f01601f19166020018201604052801561107d5781602001600182028036833780820191505090505b5090507f3000000000000000000000000000000000000000000000000000000000000000816000815181106110db577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f780000000000000000000000000000000000000000000000000000000000000081600181518110611165577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600060018460026111a59190611d3e565b6111af9190611c80565b90505b600181111561129b577f3031323334353637383961626364656600000000000000000000000000000000600f861660108110611217577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b1a60f81b828281518110611254577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600485901c94508061129490611ecc565b90506111b2565b50600084146112df576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112d690611acb565b60405180910390fd5b8091505092915050565b600060019054906101000a900460ff168061130f575060008054906101000a900460ff16155b61134e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161134590611b4b565b60405180910390fd5b60008060019054906101000a900460ff16159050801561139e576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b80156113bf5760008060016101000a81548160ff0219169083151502179055505b50565b600060019054906101000a900460ff16806113e8575060008054906101000a900460ff16155b611427576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161141e90611b4b565b60405180910390fd5b60008060019054906101000a900460ff161590508015611477576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b80156114985760008060016101000a81548160ff0219169083151502179055505b50565b600060019054906101000a900460ff16806114c1575060008054906101000a900460ff16155b611500576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114f790611b4b565b60405180910390fd5b60008060019054906101000a900460ff161590508015611550576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b80156115715760008060016101000a81548160ff0219169083151502179055505b50565b600081359050611583816121bd565b92915050565b600081359050611598816121d4565b92915050565b6000813590506115ad816121eb565b92915050565b6000604082840312156115c557600080fd5b6115cf6040611bfc565b905060006115df84828501611574565b60008301525060206115f3848285016115ff565b60208301525092915050565b60008135905061160e81612202565b92915050565b60006020828403121561162657600080fd5b600061163484828501611589565b91505092915050565b6000806040838503121561165057600080fd5b600061165e85828601611589565b925050602061166f85828601611574565b9150509250929050565b60006020828403121561168b57600080fd5b60006116998482850161159e565b91505092915050565b6000604082840312156116b457600080fd5b60006116c2848285016115b3565b91505092915050565b600080608083850312156116de57600080fd5b60006116ec858286016115b3565b92505060406116fd858286016115b3565b9150509250929050565b60006020828403121561171957600080fd5b6000611727848285016115ff565b91505092915050565b61173981611e00565b82525050565b61174881611e12565b82525050565b61175781611e1e565b82525050565b600061176882611c21565b6117728185611c2c565b9350611782818560208601611e99565b61178b81611fef565b840191505092915050565b60006117a182611c21565b6117ab8185611c3d565b93506117bb818560208601611e99565b80840191505092915050565b60006117d4602083611c2c565b91506117df82612000565b602082019050919050565b60006117f7601183611c2c565b915061180282612029565b602082019050919050565b600061181a601e83611c2c565b915061182582612052565b602082019050919050565b600061183d601283611c2c565b91506118488261207b565b602082019050919050565b6000611860602e83611c2c565b915061186b826120a4565b604082019050919050565b6000611883601283611c2c565b915061188e826120f3565b602082019050919050565b60006118a6601783611c3d565b91506118b18261211c565b601782019050919050565b60006118c9601183611c3d565b91506118d482612145565b601182019050919050565b60006118ec602f83611c2c565b91506118f78261216e565b604082019050919050565b61190b81611e54565b82525050565b61191a81611e82565b82525050565b61193161192c82611e82565b611f27565b82525050565b61194081611e8c565b82525050565b600061195182611899565b915061195d8285611796565b9150611968826118bc565b91506119748284611796565b91508190509392505050565b600061198c8287611920565b60208201915061199c8286611920565b6020820191506119ac8285611920565b6020820191506119bc8284611920565b60208201915081905095945050505050565b60006040820190506119e36000830185611730565b6119f06020830184611911565b9392505050565b6000608082019050611a0c6000830187611730565b611a196020830186611911565b611a266040830185611730565b611a336060830184611911565b95945050505050565b6000606082019050611a516000830186611730565b611a5e6020830185611911565b611a6b6040830184611911565b949350505050565b6000602082019050611a88600083018461173f565b92915050565b6000602082019050611aa3600083018461174e565b92915050565b60006020820190508181036000830152611ac3818461175d565b905092915050565b60006020820190508181036000830152611ae4816117c7565b9050919050565b60006020820190508181036000830152611b04816117ea565b9050919050565b60006020820190508181036000830152611b248161180d565b9050919050565b60006020820190508181036000830152611b4481611830565b9050919050565b60006020820190508181036000830152611b6481611853565b9050919050565b60006020820190508181036000830152611b8481611876565b9050919050565b60006020820190508181036000830152611ba4816118df565b9050919050565b6000602082019050611bc06000830184611902565b92915050565b6000602082019050611bdb6000830184611911565b92915050565b6000602082019050611bf66000830184611937565b92915050565b6000611c06611c17565b9050611c128282611ef6565b919050565b6000604051905090565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b6000611c5382611e54565b9150611c5e83611e54565b92508261ffff03821115611c7557611c74611f62565b5b828201905092915050565b6000611c8b82611e82565b9150611c9683611e82565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611ccb57611cca611f62565b5b828201905092915050565b6000611ce182611e8c565b9150611cec83611e8c565b92508260ff03821115611d0257611d01611f62565b5b828201905092915050565b6000611d1882611e82565b9150611d2383611e82565b925082611d3357611d32611f91565b5b828204905092915050565b6000611d4982611e82565b9150611d5483611e82565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615611d8d57611d8c611f62565b5b828202905092915050565b6000611da382611e54565b9150611dae83611e54565b925082821015611dc157611dc0611f62565b5b828203905092915050565b6000611dd782611e82565b9150611de283611e82565b925082821015611df557611df4611f62565b5b828203905092915050565b6000611e0b82611e62565b9050919050565b60008115159050919050565b6000819050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600061ffff82169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60005b83811015611eb7578082015181840152602081019050611e9c565b83811115611ec6576000848401525b50505050565b6000611ed782611e82565b91506000821415611eeb57611eea611f62565b5b600182039050919050565b611eff82611fef565b810181811067ffffffffffffffff82111715611f1e57611f1d611fc0565b5b80604052505050565b6000819050919050565b6000611f3c82611e82565b9150611f4783611e82565b925082611f5757611f56611f91565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f537472696e67733a20686578206c656e67746820696e73756666696369656e74600082015250565b7f50554d504b494e5f5f4241475f46554c4c000000000000000000000000000000600082015250565b7f50554d504b494e5f5f414c52454144595f564953495445445f544f4441590000600082015250565b7f50554d504b494e5f5f544f4f5f54495245440000000000000000000000000000600082015250565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b7f50554d504b494e5f5f4e4f5f414e535745520000000000000000000000000000600082015250565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000600082015250565b7f206973206d697373696e6720726f6c6520000000000000000000000000000000600082015250565b7f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560008201527f20726f6c657320666f722073656c660000000000000000000000000000000000602082015250565b6121c681611e00565b81146121d157600080fd5b50565b6121dd81611e1e565b81146121e857600080fd5b50565b6121f481611e28565b81146121ff57600080fd5b50565b61220b81611e82565b811461221657600080fd5b5056fea2646970667358221220724438d25d92e1f992c120850475f1863bfb6d55fdf0c162a4eb56b845b75e9f64736f6c63430008040033";

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
