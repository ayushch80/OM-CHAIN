const crypto = require('crypto');
const CryptoJS = require('crypto-js');
async function checkAmount(amount) {
  if (this.balance === 0) {
    console.log("ASK ADMIN TO REFILL YOUR ACCOUNT");
    return false;
  } else if (this.balance >= amount) {
    return this.balance - amount;
  } else {
    console.log("AN ERROR OCCURED -- 0x001A");
  }
}
class Wallet {
  constructor() {
    const privateKeyBytes = crypto.randomBytes(32);
    this.privateKey = privateKeyBytes.toString('hex');
    this.address = 'omc1' + CryptoJS.SHA3(this.privateKey, { outputLength: 256 }).toString().slice(24);
    this.balance = 10;
  }
  import(privateKey) {
    this.privateKey = privateKey;
    this.address = 'omc1' + CryptoJS.SHA3(this.privateKey, { outputLength: 256 }).toString().slice(24);
    this.balance = 10;
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