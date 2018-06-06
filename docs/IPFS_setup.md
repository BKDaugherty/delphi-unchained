Using IPFS with Infura

Possible addresses to use besides https://ipfs.infura.io:5001: 

Main Ethereum Network
https://mainnet.infura.io/DlraUbj4NfuZMGiKKNUc 

Test Ethereum Network (Ropsten)
https://ropsten.infura.io/DlraUbj4NfuZMGiKKNUc 

Test Ethereum Network (Rinkeby)
https://rinkeby.infura.io/DlraUbj4NfuZMGiKKNUc 

Test Ethereum Network (Kovan)
https://kovan.infura.io/DlraUbj4NfuZMGiKKNUc 

IPFS Gateway
https://ipfs.infura.io 


Set up:

npm install --save ipfs-api
npm install ipfs --global

npm install ipfs async
npm install nano-ipfs-store

### to add a file to IPFS
await ipfs.add(data_to_add)

### to retrieve the data
await ipfs.cat(hash)




