const Websocket = require('ws');

const P2P_PORT =  process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2pServer {
    constructor(blockchain){
        this.blockchain = blockchain;
        this.sockets = [];
    }

    listen(){
        const server = new Websocket.Server({ port: P2P_PORT });
        server.on('connection', socket => this.connectSocket(socket))
        console.log(`listening for peer-to-peer connections on: ${P2P_PORT}`)

        //connects to peers
        this.connectToPeers();
    }

    connectSocket(socket){
        this.sockets.push(socket);
        console.log("Socket Connected");

        this.messageHandler(socket);
        this.sendChain(socket);
    }

    connectToPeers(){
        peers.forEach(peer => {
            // ws://localhost:5001
            const socket = new Websocket(peer);
            socket.on('open', () => this.connectSocket(socket));
        })
    }

    // this is called each time socket receives new data (mine)
    // WHAT THIS DOES:
    // - gets blockchain from peer
    // - parses from string to object
    // - replaces blockchain with most recent blockchain
    messageHandler(socket) {
        socket.on("message", message => {
            const data = JSON.parse(message);
            console.log("data", data);

            this.blockchain.replaceChain(data);
        })
    }

    syncChains(){
        this.sockets.forEach(socket => this.sendChain)
    }

    sendChain(socket){
        socket.send(JSON.stringify(this.blockchain.chain))        
    }
}


module.exports = P2pServer;
//ex ~> "ws://localhost:5001, ws://localhost:5002"