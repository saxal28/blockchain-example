const express = require("express");
const bodyParser = require("body-parser");
const Blockchain = require("../blockchain");
const P2pServer = require("./p2p-server");

const HTTP_PORT =  process.env.PORT || 4001;

const app = express();

const bc = new Blockchain();
const p2pServer = new P2pServer(bc);

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(
    `
        <h1>This is the Blockchain Example App</h1>
        <a href="/blocks">Click here to see all blocks</a>
    `
    )
})

app.get('/blocks', (req, res) => {
    res.json(bc.chain);
})

app.post('/mine', (req, res) => {
    const block = bc.addBlock(req.body.data);
    console.log(`New Block added: ${block.toString()}`)

    p2pServer.syncChains();

    res.redirect("/blocks");
})

app.listen(HTTP_PORT, () => {
    console.log(`listening on port ${HTTP_PORT}`)
})

p2pServer.listen();
