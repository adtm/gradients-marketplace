//  @ts-nocheck
import React, { useState } from 'react'
import Card from '../Collectible/Card';
import { Link } from 'react-router-dom'; 
import { useEthereumProvider } from '../hooks/ethereum';
import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

const Home = () => {

  const tokenABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "symbol",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "CreatedGradient",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "gradientByTokenId",
      "outputs": [
        {
          "internalType": "string",
          "name": "left",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "right",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "left",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "right",
          "type": "string"
        }
      ],
      "name": "createGradient",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getGradient",
      "outputs": [
        {
          "internalType": "string",
          "name": "left",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "right",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "getAllGradients",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "left",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "right",
              "type": "string"
            }
          ],
          "internalType": "struct GradientDomain.Gradient[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ]

  const { error, account, ethereum } = useEthereumProvider()
  console.log(ethereum)
  let contract = new web3.eth.Contract(tokenABI, '0xf73DB986494C7Bb4cC499d0e6D6a69f3b210ADD1', {
    from: '0xe591a38f0822AC1b386f0273A47Da32e4155fD99',
    // gasPrice: 12
  });

  console.log(contract.methods)
  contract.methods.createGradient('#fffea', '#0e000').send({
    from: '0xe591a38f0822AC1b386f0273A47Da32e4155fD99',
    gas: 4000000,
    // gasLimit: 10000
  }).then((balance) => {
    console.log(balance + "----")

    
  }).catch(err => {
    console.log(err)
  });

  const [gradients, setGradients] = useState([
    { tokenId: 1, left:"#FCE38A", right: "#F38181", ownerAddress: "0xe591a38f0822AC1b386f0273A47Da32e4155fD99"},
    { tokenId: 2, left:"#F54EA2", right: "#FF7676", ownerAddress: "0xe591a38f0822AC1b386f0273A47Da32e4155fD99"},
    { tokenId: 3, left:"#17EAD9", right: "#6078EA", ownerAddress: "0xe591a38f0822AC1b386f0273A47Da32e4155fD99"},
    { tokenId: 4, left:"#622774", right: "#C53364", ownerAddress: "0xe591a38f0822AC1b386f0273A47Da32e4155fD99"},
    { tokenId: 5, left:"#7117EA", right: "#EA6060", ownerAddress: "0xe591a38f0822AC1b386f0273A47Da32e4155fD99"},
    { tokenId: 6, left:"#42E695", right: "#3BB2B8", ownerAddress: "0xe591a38f0822AC1b386f0273A47Da32e4155fD99"},
    { tokenId: 7, left:"#F02FC2", right: "#6094EA", ownerAddress: "0xe591a38f0822AC1b386f0273A47Da32e4155fD99"},
    { tokenId: 8, left:"#65799B", right: "#5E2563", ownerAddress: "0xe591a38f0822AC1b386f0273A47Da32e4155fD99"},
    { tokenId: 9, left:"#184E68", right: "#57CA85", ownerAddress: "0xe591a38f0822AC1b386f0273A47Da32e4155fD99"},
    { tokenId: 10, left:"#58247A", right: "#1BCEDF", ownerAddress: "0xe591a38f0822AC1b386f0273A47Da32e4155fD99"},
  ]);

  const [sales, setSales] = useState({
    1: {
      price: 1000,
    },
    8: {
      price: 2000
    },
    5: {
      price: 10000
    }
  })


  contract.methods.getGradient(1).call().then((grads) => {
      
    console.log(grads)
    setGradients([grads])
    // contract.methods.ownerOf(1).call().then((eee) => {
    //   console.log(eee)
    // });


  });

  

  
  //   const contract = ethereum.Contract(tokenABI, "0x62c43754CF0A79F98dE8B1bAba623f5Af5676B46")

  //   contract.methods.balanceOf('your address').call().then((balance) => {
  //     console.log(balance)
  //  });

  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-wrap flex-auto justify-center">
          {gradients.map(gr => (
            <Link to={`/collectible/1`}>
              <Card collectible={{
                ... {
                  id: gr.tokenId,
                  from: gr.left,
                  to: gr.right,
                  ownerAddress: gr.ownerAddress,
                  forSale: sales[gr.tokenId] ? true : false,
                  price: sales[gr.tokenId] != null ? sales[gr.tokenId].price : null
                }
              }} />

            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home;