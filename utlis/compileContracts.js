var solc = require('solc');
var path = require('path');

/*******compile the contract begin*******/
var input = "";

var fs = require("fs");
// Synchronous read
//TODO: change to asynchronous
var data = fs.readFileSync(path.join(__dirname,'..','contracts','courseEscrow.sol'));
//console.log("Synchronous read: " + data.toString());
input = data.toString();

var output = solc.compile(input, 1); // 1 activates the optimiser
console.log(output)


fs.writeFile("../compiled_contracts/interface.json", JSON.stringify(output))

/*******compile the contract end*******/
