const Web3 = require('web3')
const nftAddress = "0xb48E9DFAdf85A449F2D8CfE17D6Ddc3029cbEE31";
const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/20b220940ae24e3a9d1c1b0968778dcd'));

const init = async () => {
  
const id = await web3.eth.net.getId();
const nftBuild = require('../build/contracts/NFT.json')
const nftContract = new web3.eth.Contract(nftBuild.abi, nftAddress);
const addresses = await web3.eth.getAccounts();

 // await contract.methods.mint().send({from: addresses[0]});
const START_BLOCK = 1;
 //const END_BLOCK =50;
const newV = nftContract.events.allEvents({fromBlock: START_BLOCK})
    .on('data', event => console.log(event));
    // if(newV.Result.to == "0xe2b5a5b611643c7e0e4D705315bf580B75472d7b")
    // {
    //   console.log("The id which is transfred :", newV.id);
    // }
//console.log(newV.Result.from);
//     .on('data', event => console.log(event.address));

 // await new Promise(resolve => setTimeout(() => resolve(), 2000)); 
 // await contract.methods.emitEvent().send({from: addresses[0]});
}
init();