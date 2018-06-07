const SHA256 = require("crypto-js/sha256");
const { DIFFICULTY, MINE_RATE } = require("../config")

class Block {
    constructor(timestamp, lastHash, hash, data, nonce, difficulty){

        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

    static genesis(){
        return new this("Genesis Time", "-----", "first-hash", [], 0, DIFFICULTY)
    }

    toString(){
        return `Block -
            Timestamp  : ${this.timestamp}
            Last Hash  : ${this.lastHash.substring(0,10)}
            Hash       : ${this.hash.substring(0,10)}
            Nonce      : ${this.nonce}
            Data       : ${this.data}
            Difficulty : ${this.difficulty}
        `;
    }

    static mineBlock(lastBlock, data)  {

        let hash, timestamp; //reassign -> apart of proof of work
        const lastHash = lastBlock.hash;
        let { difficulty } = lastBlock;
        let nonce = 0;
        
        // proof of work

        do {
            nonce++;
            timestamp = Date.now();   
            
            difficulty = Block.adjustDifficulty(lastBlock, timestamp)

            hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);  
        } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));

        return new this(timestamp, lastHash, hash, data, nonce, difficulty)

    }

    static hash(timestamp, lastHash, data, nonce, difficulty) {
        return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    static blockHash(block){
        const { timestamp, lastHash, hash, data, nonce, difficulty } = block;

         return Block.hash(timestamp, lastHash, data, nonce, difficulty);
    }

    // auto adjusts the difficulty based off of the last block mine rate
    static adjustDifficulty(lastBlock, currentTime){
        let { difficulty } = lastBlock;

        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
        return difficulty
    }
}

module.exports = Block;