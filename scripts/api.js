const Web3 = require('web3')
const nftAddress = "0xb48E9DFAdf85A449F2D8CfE17D6Ddc3029cbEE31";
const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/20b220940ae24e3a9d1c1b0968778dcd'));

const nftBuild = require('../build/contracts/NFT.json')
const nftContract = new web3.eth.Contract(nftBuild.abi, nftAddress);
const mongoose = require('mongoose');



//////////////////////////////////////////////////////////////////// Connection to mongodb //////////////////////////////////////////////////

mongoose.connect('mongodb://localhost:27017/NFTgetpastevents',{
  useUnifiedTopology : true,
    //useNewUriParser: true,
}).then(()=> console.log("connection successfull....."))
.catch((err)=> console.log(err));


// Creating a Schema and a Model for DB

const NFTdbSchema = new mongoose.Schema({
    _id: Number,
    status: String,
    owneraddress: String,
    longitude: String,
    latitude: String
    
});

const NFTdbModel = new mongoose.model('NFTcollection', NFTdbSchema);


  


  

//////////////////////////////////////////////////////////// Create document or insert function //////////////////////////////////////////////////////

const CreateDocument = async () => {

  
    // const [account] = await web3.eth.getAccounts()
   const totalMinted = await nftContract.methods.walletOfOwner('0xa864f883E78F67a005a94B1B32Bf3375dfd121E6').call()
   
   
    console.log("Owner has this many NFTs in their wallet:",totalMinted.length);
    try{
 
         for(var i = 1; i <= totalMinted.length; i++){
         const NFTdbInstance = new NFTdbModel({
             _id: i,
             status: 'Unallocated',
             owneraddress: await nftContract.methods.ownerOf(i).call(),  
             longitude: '0',
             latitude: '0'
           })
           const result = await NFTdbInstance.save();
            console.log(result);
           }//end forloop
         }  // end of try
         catch(err){
         console.log(err);
         
     }
 
     
   }//end of Createfunction



/////////////////////////////////////////////////////////////////   function to update the documents////////////////////////////////////////////////////////////
    
  const UpdateDocument = async (lengths, ID , to) => {
  
    try{
      
      for(i=1; i <= lengths ; i++)
      {
       console.log("Length after passing the value:", lengths); 
      const updatedata = await NFTdbModel.updateMany({_id:ID}, {$set:{status:"Allocated", owneraddress: to}});
      }
    }catch(err){
      console.log(err);
    }


  }//end of Updatefunction



///////////////////////////////////////////////////////////////// function to read documents////////////////////////////////////////////////////

  const ReadDocument = async () => {

 
    
    const START_BLOCK = 0;
    const END_BLOCK =100000000000;
  
  const getEvents = await  nftContract.getPastEvents("Transfer",
      {                               
          fromBlock: START_BLOCK,     
          toBlock: END_BLOCK // You can also specify 'latest'          
      })                              
  .then(events => (events))
  .catch((err) => console.error(err));
  
  console.log('This is the total count of Transfer events Emitted:',getEvents.length);
  
 
 for(var i = 0; i <getEvents.length; i++)
{
   const check = getEvents[i].returnValues['tokenId'];
   console.log('Count:',check);
   if(getEvents[i].returnValues['from'] !== '0x0000000000000000000000000000000000000000')
   {
                    const to = getEvents[i].returnValues['to'];
                    const ID = getEvents[i].returnValues['tokenId'];                                 

                    console.log( 'To:', to);
                    console.log( 'ID:', ID);
                    const lengths = ID.length;
                
                
                    console.log ("This is the length of The ID:",lengths); 
                    UpdateDocument(lengths, ID, to);
    }// end of if

} // end of forloop
 
  
  } //end of readfunction
  
  

  
    CreateDocument();
    //  ReadDocument ();
   //UpdateDocument(); 
   


    