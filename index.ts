import {Block} from "./Block";
import {Transaction} from "./Transaction";
import sha256 from 'sha256';

class Blockchain {
    private chain: Block[];
    private pendingTransactions: Transaction[];

    constructor() {
        this.chain = [];
        this.pendingTransactions = [];

        this.createNewBlock(100, '0', '0'); // Genesis
    }

    public createNewBlock(nonce: number, previousBlockHash: string, hash: string) {
        const newBlock = new Block(
            this.chain.length + 1,
            Date.now(),
            this.pendingTransactions,
            nonce,
            hash,
            previousBlockHash
        );

        this.pendingTransactions = [];
        this.chain.push(newBlock);

        return newBlock;
    }

    private getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    /**
     * When a transaction is created, it gets pushed into the array of transaction but
     * not added to the Blockchain yet. It only gets added when a new block is mines.
     * So all new transaction are actually pending transactions and not validated yet.
     * */
    createNewTransaction(amount: number, sender: string, recipient: string) {
        const newTransaction = new Transaction(amount, sender, recipient);

        this.pendingTransactions.push(newTransaction);
        return this.getLastBlock()['index'] + 1; // index of the last block in our chain
    }

    hashBlock(previousBlockHash: string, currentBlockData: object[], nonce: number) {
        const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);

        return sha256(dataAsString);
    }

    /**
     * Given the previousBlockHash and the currentBlockData, the resulting should begin
     * with '0000' in order to avoid people to add fake blocks (e.g. faking the amount
     * of bitcoin they have). By using the hashBlock method, it will try to generate a correct
     * hash. The hashBlock method will run as many time it is necessary by constantly changing
     * the nonce value. This is very secure because if someone wants to change the value of a block,
     * it will take a lot of machine power and time to recalculate the hash of each block.
     * */
    proofOfWork(previousBlockHash, currentBlockData) {
        let nonce = 0;
        let hash = this.hashBlock(previousBlockHash,currentBlockData, nonce);

        while (hash.substring(0, 4) !== '0000') {
            nonce++;
            hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
        }

        return nonce;
    }

}

const domCoin = new Blockchain();

//PART 1
/*
domCoin.createNewBlock(10, 'NAUS83R7B', 'OPIFEW8E');
domCoin.createNewBlock(1033, 'OPIFEW8E', '8435Y487');
domCoin.createNewBlock(100, '8435Y487', 'UI7T93G4ITU');
console.log(domCoin);
*/

// PART 2 - new Transaction testing
/*
domCoin.createNewBlock(1045327, 'NAUS83R7B', 'OPIFEW8E');
domCoin.createNewTransaction(100, 'DAN7T87ASDASG', 'PAU2943H48H');
domCoin.createNewBlock(28374, 'ABHBF7S', '998DASDHUB');

console.log(domCoin);
// console.log(domCoin.chain[1]);
*/

// PART 3 - hashBlock method test
/*
const previousBlockHash = '683T8GIR8GR882GR8R';
const tran1 = new Transaction(100, 'DAN7T87ASPASG', 'PAU2943H48H');
const tran2 = new Transaction(4134, 'DAN7T87ASDASG', 'SOL28y723HHB8H');
const currentBlockData = [tran1, tran2];

const nonce = 100;
console.log(domCoin.hashBlock(previousBlockHash, currentBlockData, nonce));
*/

// PART 4 - proof of work test
/*
const previousBlockHash = '683T8GIR8GR882GR8R';
const tran1 = new Transaction(100, 'DAN7T87SPASG', 'PAU2943H48H');
const tran2 = new Transaction(4134, 'DAN7T87SDASG', 'SOL28y723HHB8H');
const currentBlockData = [tran1, tran2];

console.log(domCoin.proofOfWork(previousBlockHash, currentBlockData)); // we should just get a nonce value
*/

//PART 5 - test genesis block
// console.log(domCoin);