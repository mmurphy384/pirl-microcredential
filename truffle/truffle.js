module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      gas: 4600000,// <-- Use this high gas value
      gasPrice: 0x01,      // <-- Use this low gas price
      network_id: '*' // Match any network id
    },
    stage: {
      host: '192.186.98.42',
      port: 8787,
      gas: 4600000,
      network_id: '10' // Match any network id
    }
  }
}
