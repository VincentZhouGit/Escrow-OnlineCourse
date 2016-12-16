var Web3 = require('web3');

//initialize web3(to connect to blockchain)
var web3;
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}


var sender = "0xd522a817fe9544ad5411405138b2c0384d1c8064";

var receiver = '0xA095ef6ece790a59B75ffB1934023c5130dFc7C3';


web3.eth.sendTransaction({from:sender, to: receiver, value: web3.toWei(8000, "ether")});


/**
 * Created by zhizhou on 2016-11-16.
 */
