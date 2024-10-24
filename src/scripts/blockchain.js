import crypto from 'crypto';
import DateGenerator from 'random-date-generator';
import { loremIpsum } from "lorem-ipsum";

// Función para crear un bloque
function createBlock(index, transactionWorker, date, data, previousHash) {
    const block = {
        index,
        transactionWorker,
        date,
        data,
        previousHash,
        nonce: 0,
        hash: '',

        calculateHash() {
            const dataStr = String(this.index + this.data + this.date + this.previousHash + this.nonce);
            return crypto.createHash('sha256', "Otto Krause").update(dataStr).digest('hex');
        },
        
        mineBlock(difficulty) {
            do {
                this.nonce++;
                this.hash = this.calculateHash();
            } while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0"));
        }
    };

    // Calcular el hash inicial
    block.hash = block.calculateHash();
    return block;
}

// Función para crear una cadena de bloques
function createBlockchain(difficulty) {
    const blockchain = {
        chain: [],
        difficulty,

        createGenesisBlock() {
            const genesisBlock = createBlock(0, "Blockchain", "01/01/2001", "Genesis block", "0");
            this.chain.push(genesisBlock);
            return genesisBlock;
        },

        getLatestBlock() {
            return this.chain[this.chain.length - 1];
        },

        getLastIndex() {
            return this.chain.length;
        },

        getLatestHash() {
            return this.getLatestBlock().hash;
        },

        addBlock(newBlock) {
            newBlock.previousHash = this.getLatestHash();
            newBlock.mineBlock(this.difficulty);
            this.chain.push(newBlock);
        },

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
    };

    // Crear el bloque génesis al inicializar
    blockchain.createGenesisBlock();
    return blockchain;
}

export { createBlock, createBlockchain };

// Ejemplo de uso:
// const newBlockchain = createBlockchain(4);
// for (let i = 1; i < 6; i++) {
//     const newBlock = createBlock(i, "Juan", DateGenerator.getRandomDate(), loremIpsum(), newBlockchain.getLatestHash());
//     newBlockchain.addBlock(newBlock);
// }
// console.log(newBlockchain.chain);
// console.log(newBlockchain.isChainValid());
