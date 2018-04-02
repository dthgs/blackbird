import * as crypto from 'crypto-js';

export class Transaction {
    fromAddr: any;
    toAddr: any;
    amount: any;

    constructor(fromAddr, toAddr, amount){
        this.fromAddr = fromAddr;
        this.toAddr = toAddr;
        this.amount = amount;
    }
}

export class Block {    
    nonce: number;
    timestamp: Date;
    transactions: any;
    prevHash; hash: string;

    constructor(timestamp, transactions, prevHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.prevHash = prevHash;
        this.hash = this.hashBlock();
        this.nonce = 0;
    }

    hashBlock(){
        return crypto.SHA256(this.prevHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.hashBlock();
        }

        console.log("Block mined: " + this.hash);
    }
}

export class Blockchain {
    chain: Block[];
    difficulty; reward: number;
    pendingTransactions: Transaction[];

    constructor(){
        this.chain = [this.makeGenesisBlock()];
        this.difficulty = 3;
        this.pendingTransactions = [];
        this.reward = 5;
    }

    makeGenesisBlock(){
        return new Block("03/30/2018", "FirstBlock", "x");
    }

    getLastBlock(){
        return this.chain[this.chain.length - 1];
    }

    minePendingTxs(rewardAddr){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);
        console.log("Block was successfully mined!");
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, rewardAddr, this.reward)
        ];
    }

    createTx(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddr(address){
        let balance = 0;

        for(const block of this.chain){
            for(const tx of block.transactions){
                if(tx.fromAddr === address){
                    balance -= tx.amount;
                }
                if(tx.toAddr === address){
                    balance += tx.amount;
                }
            }
        }

        return balance;
    }

    /*addBlock(block){
        block.prevHash = this.getLastBlock().hash;
        block.mineBlock(this.difficulty);
        this.chain.push(block);
    }*/

    checkChain(){
        let valid = true;
        for(let i = 1; i < this.chain.length; i++){
            const block = this.chain[i];
            const prevBlock = this.chain[i - 1];

            if(block.prevHash != prevBlock.hash){
                valid = false;
                break;
            }
            if(block.hash != block.hashBlock()){
                valid = false;
                break;
            }
        }
        return valid;
    }
}