const sha256 = require('crypto-js/sha256');
class Block {
  constructor(nonce, timestamp, data, previousHash, miner, difficulty) {
    this.nonce = nonce;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.difficulty = difficulty;
    this.hash = this.calculateHash(difficulty);
    this.miner = miner;
  }
  
  calculateHash(difficulty) {
    const pow = require('proof-of-work');
    const solver = new pow.Solver();
    const nonce = solver.solve(difficulty);
    return "0x"+sha256(sha256(nonce.toString()).toString()).toString();
  }
  
}
module.exports = Block;
