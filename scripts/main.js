const crypto = require('crypto');
const { lstat } = require('fs');

class block {
    constructor(index, transactionWorker, date, amount, previousHash = '') {
        this.index = index
        this.transactionWorker = transactionWorker
        this.date = date 
        this.amount = amount
        this.hash = this.newHash()
        this.previousHash = previousHash
    }

    newHash(){
        // let hash = crypto.getHashes();
        return crypto.createHash('sha256', "patata  ").update(parseInt(this.previousHash).toString()).digest('hex');
    }    
}

class blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new block(0, "Guille", "01/01/2001", 0, "0")
    }

    getLatestBlock(){
        return this.chain[this.chain.length];
    }

    addBlock(){
        let lastChain = this.chain[this.chain.length]
        this.chain.push(new block(this.chain.length, "Guille", "01/01/2001", 0, parseInt(lastChain.hash).toString()));
    }
}

let newBlockchain = new blockchain();

for (let i = 0; i < 5; i++) {
    newBlockchain.addBlock();
    console.log(newBlockchain.addBlock());
}