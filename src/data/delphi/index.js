import web3 from '../../web3'
import delphiStake from './delphiStake.json'
const delphiAddress = "0x4e1389e590e7ef394cf5c7a13e1353c61028fc73"
let dsHandle = new web3.eth.Contract(delphiStake.abi)
dsHandle.options.address = delphiAddress
export default dsHandle