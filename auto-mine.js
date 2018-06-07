const Blockchain  = require("./blockchain");
const bc = new Blockchain();

// this is going to mine until you close out of the node app
do {
    console.log(bc.addBlock("--").toString());
} while ( true )