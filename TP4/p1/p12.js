// P1.2

const SHA256 = require('crypto-js/sha256');

class Block {
    
    constructor(index,timestamp,data,previousHash=''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;

        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }

}

class Blockchain {
    
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0,this.creatingNewTimestamp(), "Bloco inicial da koreCoin", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(b){
        b.previousHash = this.getLatestBlock().hash; //Pega na hash do último bloco da blockchain
        b.hash = b.calculateHash();
        this.chain.push(b);
        console.log('Adding new Block.')
    }

    isChainValid(){
        for(let i = 1 ; i < this.chain.length ; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            if (currentBlock.previousHash !== previousBlock.hash)
                return false;
            if (currentBlock.hash !== currentBlock.calculateHash())
                return false;
        }
        return true;
    }

    creatingNewTimestamp(){
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        return dateTime;
    }
}

let koreCoin = new Blockchain();

koreCoin.addBlock(new Block (1, "01/01/2018", {amount: 20}));
koreCoin.addBlock(new Block (2, "02/01/2018", {amount: 40}));
koreCoin.addBlock(new Block (3, "02/01/2018", {amount: 40}));

koreCoin.addBlock(new Block(4,koreCoin.creatingNewTimestamp(),{amount: 150}));
koreCoin.addBlock(new Block(5,koreCoin.creatingNewTimestamp(),{amount: 40, Block1: 10}));
koreCoin.addBlock(new Block(6,koreCoin.creatingNewTimestamp(),{amount: 10, Block2: 23}));
koreCoin.addBlock(new Block(7,koreCoin.creatingNewTimestamp(),{amount: 90, Block3: 60}));


console.log('Is Blockchain valid? ' + koreCoin.isChainValid());

//console.log(koreCoin.chain)

