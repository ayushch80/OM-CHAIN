const Block = require('./block');
class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }
  createGenesisBlock() {
    return new Block(0, Date.now(), 'Genesis block', '0', '0x00000000000000000000000000000000', 2);
  }
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    //newBlock.hash = newBlock.calculateHash(3);
    this.chain.push(newBlock);
  }
  /*
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      if (currentBlock.hash !== currentBlock.calculateHash(3)) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
  */
  mineBlock(data, wallet, difficulty) {
    const newBlock = new Block(this.getLatestBlock().nonce + 1, Date.now(), data, this.getLatestBlock().hash, wallet, difficulty);
    this.addBlock(newBlock);
    this.balance += 100;
  }
}

module.exports = Blockchain;