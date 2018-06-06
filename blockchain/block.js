const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(timestamp, lastHash, hash, data){

        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;

    }

    static genesis(){
        return new this("Genesis Time", "-----", "first-hash", [])
    }

    static mineBlock(lastBlock, data)  {

        const timestamp = Date.now();
        const lastHash = lastBlock.hash
        const hash = Block.hash(timestamp, lastHash, data);

        return new this(timestamp, lastHash, hash, data)

    }

    static hash(timestamp, lastHash, data){
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }

    static blockHash(block){
        const { timestamp, lastHash, hash, data } = block;

         return Block.hash(timestamp, lastHash, data);
    }
}

module.exports = Block;