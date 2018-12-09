export class Block {
    private index: number;
    private timestamp: number;
    private transactions: object[];
    private nonce: number; // (could be any number) a proof that we created a new block in a legitimate way, meaning using a proof of work.
    private hash: string;
    private previousBlockHash: string;


    constructor(index: number, timestamp: number, transactions: object[], nonce: number, hash: string, previousBlockHash: string) {
        this.index = index;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.nonce = nonce;
        this.hash = hash;
        this.previousBlockHash = previousBlockHash;
    }
}