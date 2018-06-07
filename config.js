// difficulty of proof of work AKA 'nonce value'
// implementing the nonce value allows us to slow the rate of mining
const DIFFICULTY = 4;

// mine rate (in ms)  -> dynamic
// can adjust if difficulty is too hard | easy
const MINE_RATE = 3000;

module.exports = {
    DIFFICULTY,
    MINE_RATE
}