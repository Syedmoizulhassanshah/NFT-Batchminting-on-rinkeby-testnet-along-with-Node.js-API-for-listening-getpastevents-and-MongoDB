# NFT-Batchminting-on-rinkeby-testnet-along-with-a-Node.js-API-for-listening-all-the-events-and-updating-MongoDB-when-NFTs-are-transferred-to-new-Owners

# 1. Clone/Download the Repository
$ git clone https://github.com/Syedmoizulhassanshah/NFT-Batchminting-on-rinkeby-testnet-along-with-Node.js-API-for-listening-all-the-events-and-MongoDB.git
# 2. Install Dependencies:
$ cd NFT-Batchminting-on-rinkeby-testnet-along-with-Node.js-API-for-listening-all-the-events-and-MongoDB
$ npm install or npm i
# 3. Smart Contracts
Deploy smart contract on rinkeby testnet from truffle or directly from remix

# 4. EventListner Script

here we have two scripts EventListner.js and Past_query Kindly use different mongodb connection for both scripts.

->>script/EventListner.js

1. replace your deploy nft contract address in all js files.

2. replace rinkeby provided CLIENT_URL. (infure url)

3. Setup and connect Mongodb.

4. First run the create document function in the api.js that will fill the database table.

5. then run the read document function this will automatically  call the updatedocument function to update the database that you created previously if the token is transferred to someone else.

->> With status of NFTs ( from Unallocated to Allocated ) and their owneraddresses (from previousOwner to NewOwner).

**$ node ./scripts/EventListner.js**

**$ node ./scripts/Past_query.js**

