const crypto = require('crypto');
const { lstat } = require('fs');

class Block {
    constructor(index, transactionWorker, date, data, previousHash) {
        this.index = index
        this.transactionWorker = transactionWorker
        this.date = date 
        this.data = data
        this.hash = this.newHash()
        this.previousHash = previousHash
    }

    newHash(){
        return crypto.createHash('sha256', "patata ").update(this.data).digest('hex');
    }    
}

class Blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "Guille", "01/01/2001", "Genesis block", "0")
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.newHash();
        this.chain.push(newBlock);
    }
}

let newBlockchain = new Blockchain();

// newBlockchain.createGenesisBlock();

newBlockchain.createGenesisBlock();
newBlockchain.addBlock(new Block(1, "Guille", "01/01/2001", "newContent", newBlockchain.getLatestBlock));
newBlockchain.addBlock(new Block(2, "Guille", "01/01/2001", "dsadasdas", newBlockchain.getLatestBlock));
newBlockchain.addBlock(new Block(3, "Guille", "01/01/2001", "newCgfhgdfhgfontent", newBlockchain.getLatestBlock));
newBlockchain.addBlock(new Block(4, "Guille", "01/01/2001", "newfsdfsdContent", newBlockchain.getLatestBlock));
for (let i = 0; i < 5; i++) {
    console.log(newBlockchain.chain[i])
}