import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { IOrderDetail } from '../shared/interfaces/order-detail.interface';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private contract: any;
  private contractAddress = '0x5e70cA2b94910F1B89fd5BC19B4aEc3F4140Ae44'; // Endereço do contrato
  private contractABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "productName",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "orderDate",
                "type": "string"
            }
        ],
        "name": "cretaedPackage",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "trackingCode",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "newStatus",
                "type": "string"
            }
        ],
        "name": "updatedPackageStatus",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "trackingCode",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "orderDate",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "orderStatus",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "deliveryAddress",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "deliveryEstimation",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "productName",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "totalPrice",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "lastUpdate",
                "type": "string"
            }
        ],
        "name": "createPackage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "trackingCode",
                "type": "string"
            }
        ],
        "name": "getPackageByTrackingCode",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "trackingCode",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "orderDate",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "orderStatus",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "deliveryAddress",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "deliveryEstimation",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "productName",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "quantity",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "lastUpdate",
                        "type": "string"
                    }
                ],
                "internalType": "struct Package.package",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getPackages",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "trackingCode",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "orderDate",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "orderStatus",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "deliveryAddress",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "deliveryEstimation",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "productName",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "quantity",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "lastUpdate",
                        "type": "string"
                    }
                ],
                "internalType": "struct Package.package[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "packagesList",
        "outputs": [
            {
                "internalType": "string",
                "name": "trackingCode",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "orderDate",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "orderStatus",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "deliveryAddress",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "deliveryEstimation",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "productName",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "totalPrice",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "lastUpdate",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "trackingCode",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "newStatus",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "lastUpdate",
                "type": "string"
            }
        ],
        "name": "updateOrderStatus",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

  constructor() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable().catch(() => {
        console.log('User denied account access...');
      });
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    this.contract = new window.web3.eth.Contract(this.contractABI, this.contractAddress);
  }

  async createPackage(data: IOrderDetail): Promise<any> {
    try {

    const accounts = await window.web3.eth.getAccounts();
    return this.contract.methods.createPackage(
      data.trackingCode,
      String(data.orderDate),
      data.orderStatus,
      data.deliveryAddress,
      String(data.deliveryEstimation),
      data.productName,
      data.quantity,
      data.totalPrice,
      String(data.lastUpdate)
    ).send({ from: accounts[0] });
  }

  catch (error) {
    if (error instanceof Error) {
      console.error('Web3 Validator Error:', error.message);
    } else {
      console.error('Unexpected Error:', error);
    }
    throw error;
  }

}

  async getPackages(): Promise<any> {
    const packages = await this.contract.methods.getPackages().call()
    return packages;
  }

  async getPackageByTrackingCode(trackingCode: string): Promise<any> {
    return this.contract.methods.getPackageByTrackingCode(trackingCode).call();
  }

  async updateOrderStatus(trackingCode: string, newStatus: string, lastUpdate: string): Promise<any> {
    const accounts = await window.web3.eth.getAccounts();
    return this.contract.methods.updateOrderStatus(trackingCode, newStatus, lastUpdate).send({ from: accounts[0] });
  }
}