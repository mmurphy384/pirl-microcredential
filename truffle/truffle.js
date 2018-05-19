module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      gas: 6612388,
      network_id: '*' // Match any network id
    },
    stage: {
      host: '192.186.98.42',
      port: 8787,
      gas: 6612388,
      network_id: '10' // Match any network id
    }
  }
}
