const crypto = require('crypto');
const CryptoJS = require('crypto-js');
//const Transaction = require('./transaction');
class Wallet {
  constructor() {
    const privateKeyBytes = crypto.randomBytes(32);
    this.privateKey = privateKeyBytes.toString('hex');
    this.address = 'omc1' + CryptoJS.SHA3(this.privateKey, { outputLength: 256 }).toString().slice(24);
    this.balance = 0;
  }
  import(privateKey) {
    this.privateKey = privateKey;
    this.address = 'omc1' + CryptoJS.SHA3(this.privateKey, { outputLength: 256 }).toString().slice(24);
    this.balance = 0;
  }
  importOnlyAddress(address) {
    this.address = address;
    this.balance = 0;
  }
  myBalance() {
    return this.balance;
  }
}
module.exports = Wallet;