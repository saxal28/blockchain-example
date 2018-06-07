const Block = require("./block");

class Blockchain {
    constructor(){
        this.chain = [Block.genesis()];
    }

    // pushes a new block to the blockchain
    addBlock(data){
        const block = Block.mineBlock(this.chain[this.chain.length-1], data)
        this.chain.push(block);

        return block;
    }

    isValidChain(chain){

        // first block is not equal to genesis block
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
             return false
        }

        for(let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const lastBlock = chain[i - 1];

            // if block's last hash is not equal to the last block's hash, invalid.
            if (block.lastHash !== lastBlock.hash ||
            // if block's hash value does not equal the generated hash value
            // ie. data was tampered with.
                block.hash !== Block.blockHash(block))
            {
                return false;
            }

            return true;

        }
    }

    // this replaces the blockchain if:
    // - it's valid and longer than the current chain
    replaceChain(newChain) {

        // only want to replace a chain if it's longer than current chain
        if(newChain.length <= this.chain.length) {
            console.log("Received chain is not longer that the current chain");
            return;
        } else if(!this.isValidChain(newChain)) {
            console.log("the received chain is not valid");
            return;
        }

        console.log("Replacing blockchain with the new chain"); 
        this.chain = newChain;

    }
}

module.exports = Blockchain;