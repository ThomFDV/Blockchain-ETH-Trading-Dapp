import {Injectable} from '@angular/core';
import Web3 from "web3";

declare let require: any;
declare let window: any;
const tokenAbi = require('../../../../build/contracts/Marketplace.json');

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {
  web3: any;
  enable: any;
  private account: any;
  private marketplaceContract: any;

  constructor() {
    if (window.ethereum === undefined) {
      alert('Non-Ethereum browser detected. Install MetaMask');
    } else {
      if (typeof window.web3 !== 'undefined') {
        this.web3 = window.web3.currentProvider;
      } else {
        this.web3 = new Web3.providers.HttpProvider('http://localhost:8545');
      }
      window.web3 = new Web3(window.ethereum);
      this.enable = this.enableMetaMaskAccount();
      const contract = require('@truffle/contract');
      this.marketplaceContract = contract(tokenAbi);
      this.marketplaceContract.setProvider(this.web3);
    }
  }

  private async enableMetaMaskAccount(): Promise<any> {
    let enable = false;
    await new Promise((resolve, reject) => {
      enable = window.ethereum.enable();
    });
    return Promise.resolve(enable);
  }

  private async getAccount(): Promise<any> {
    if (this.account == null) {
      this.account = await new Promise((resolve, reject) => {
        window.web3.eth.getAccounts((err, retAccount) => {
          console.log('marketplace.service :: getAccount: retAccount');
          console.log(retAccount);
          if (retAccount.length > 0) {
            this.account = retAccount[0];
            resolve(this.account);
          } else {
            alert('marketplace.service :: getAccount :: no accounts found.');
            reject('No accounts found.');
          }
          if (err != null) {
            alert('marketplace.service :: getAccount :: error retrieving account');
            reject('Error retrieving account');
          }
        });
      }) as Promise<any>;
    }
    return Promise.resolve(this.account);
  }

  public async getUserBalance(): Promise<any> {
    if (!this.account) this.account = await this.getAccount();
    return new Promise((resolve, reject) => {
      window.web3.eth.getBalance(this.account, function(err, balance) {
        if (!err) {
          const retVal = {
            account: this.account,
            balance: balance
          };
          resolve(retVal);
        } else {
          reject({account: 'error', balance: 0});
        }
      });
    }) as Promise<any>;
  }

  async sellMyProperty(property: string[]) {
    if (!this.account) this.account = await this.getAccount();
    return new Promise((resolve, reject) => {
      this.marketplaceContract.deployed()
        .then((instance) => {
        return instance.sellProperty(
          ...property,
          { from: this.account }
        );
        }).then((status) => {
          if (status) {
            return resolve({status: true});
          }
        }).catch((error) => {
          console.error(error);
          return reject('marketplace.service error');
        });
    });
  }

  async getOneProperty(id: number) {
    if (!this.account) this.account = await this.getAccount();
    return new Promise((resolve, reject) => {
      this.marketplaceContract.deployed()
        .then((instance) => instance.getProperty(id, { from: this.account }))
        .then((res) => {
          return resolve(res);
        }).catch((error) => {
        console.error(error);
        return reject('marketplace.service error');
      });
    });
  }

  async getAllProperties() {
    if (!this.account) this.account = await this.getAccount();
    return new Promise((resolve, reject) => {
      this.marketplaceContract.deployed()
        .then((instance) => instance.getProperties())
        .then((res) => {
          return resolve(res);
        }).catch((error) => {
        console.error(error);
        return reject('marketplace.service error');
      });
    });
  }

}
