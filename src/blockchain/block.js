const sha256 = require('crypto-js/sha256');
//const Transaction = require('./transaction');
class Block {
  constructor(nonce, timestamp, data, previousHash, miner, difficulty) {
    this.nonce = nonce;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.difficulty = difficulty;
    this.hash = this.calculateHash(difficulty);
    this.miner = miner.address;
    this.previousReward = 100;
    let reward;
    try {
      reward = (Math.round(Math.cos(Math.random()*3))+this.previousReward)-((this.previousReward)/100)*Math.random();
    } catch (e) {
      console.log(e);
    }
    this.reward = reward

    miner.balance += this.reward;
  }

  calculateHash(difficulty) {
    const pow = require('proof-of-work');
    const solver = new pow.Solver();
    var nonce = solver.solve(difficulty);
    return "0x"+sha256(sha256(nonce.toString()+this.transactions).toString()).toString();
  }

}
module.exports = Block;