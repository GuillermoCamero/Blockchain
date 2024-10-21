const crypto = require('crypto');
const { lstat } = require('fs');

class Block {
    constructor(index, transactionWorker, date, data, previousHash) {
        this.index = index
        this.transactionWorker = transactionWorker
        this.date = date 
        this.data = data
        this.hash = this.calculateHash()
        this.previousHash = previousHash
        this.nonce = 0;
    }

    calculateHash(){
        const data = String(this.index + this.data + this.date + this.nonce);
        return crypto.createHash('sha256', "patata").update(data).digest('hex');
    }    
    
    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
            console.log(this.hash);
        }
    }
}

class Blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;
    }

    createGenesisBlock(){
        return new Block(0, "Guille", "01/01/2001", "Genesis block", "0")
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.previousHash != previousBlock.hash)
                return i
            return true
        }
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

console.log(newBlockchain.isChainValid());