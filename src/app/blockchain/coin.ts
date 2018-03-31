import * as crypto from 'crypto-js';

export class Block {    
    index: number;
    timestamp: Date;
    data: any;
    prevHash; hash: string;

    constructor(index, timestamp, data, prevHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.hashBlock();
    }

    hashBlock(){
        return crypto.SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

export class Blockchain {
    chain: any[];

    constructor(){
        this.chain = [this.makeGenesisBlock()];
    }

    makeGenesisBlock(){
        return new Block(0, "03/30/2018", "FirstBlock", "x");
    }

    getLastBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(block){
        block.prevHash = this.getLastBlock().hash;
        block.hash = block.hashBlock();
        this.chain.push(block);
    }

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