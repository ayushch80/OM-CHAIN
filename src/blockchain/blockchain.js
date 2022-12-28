const Block = require('./block');
const Wallet = require('./wallet');
//const Transaction = require('./transaction');
class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }
  createGenesisBlock() {
    const nullWallet = new Wallet;
    nullWallet.importOnlyAddress('omc100000000000000000000000000000000')
    return new Block(0, Date.now(), 'Genesis block', '0', nullWallet, 3);
  }
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.previousReward = this.getLatestBlock().reward;
    this.chain.push(newBlock);
  }
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
  mineBlock(data, wallet) {
    let diff = Math.floor(this.getLatestBlock().nonce/50);
    const newBlock = new Block(this.getLatestBlock().nonce + 1, Date.now(), data, this.getLatestBlock().hash, wallet, diff);
    this.addBlock(newBlock);
  }
}

module.exports = Blockchain;