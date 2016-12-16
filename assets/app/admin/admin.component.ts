import {Component, OnInit, Inject} from '@angular/core';
import {AdminService} from "./admin.service";
import { Http, Headers, Response } from "@angular/http";
import 'web3';

declare var Web3: any;
declare var window:any

@Component({
    selector: 'app-admin',
    template: `
        <h3>Hello, this is the admin page.</h3>
        <div >
            <button class="btn btn-primary" (click)="onDeploy()">Deploy</button>
        </div>
        
        
        <div >
            <button class="btn btn-primary" (click)="onCollectMoney()">collectMoney</button>
        </div>
        
        
        <div >
            <button class="btn btn-primary" (click)="onGetContractInfo()">GetContractInfo</button>
        </div>
        
        <div >
            <button class="btn btn-primary" (click)="onGetContractBalance()">GetContractBalance</button>
        </div>
        
        
        
    `,
    providers:[AdminService]
})
export class AdminComponent implements OnInit {

    web3: any;

    constructor(private adminService: AdminService) {
    }

    ngOnInit() {
        var _this = this;
        var a = new Promise(function (resolve, reject) {
            window.addEventListener('load', function () {
                resolve(new Web3(this.web3.currentProvider));

            })
        });

        a.then(
            function (val) {
                console.log(val);
                _this.web3 = val;
            }
        ).catch(
            // Log the rejection reason
            function (reason) {
                console.log('Handle rejected promise (' + reason + ') here.');
            });

        console.log(this.web3);
    }


    onDeploy() {
        var __this = this;
        this.adminService.getContractInterface().subscribe(
            data => {
                data = JSON.parse(data);
                console.log(data)
                var contractName = 'courseEscrow';

                var _coursePrice = 500000; //wei
                var _enrollStart = 1479598309 ; //unix timestamps
                var _enrollEnd = _enrollStart + 3 * 60;//unix timestamps; ended in two days
                var _refundTime = 0 * 60; //unix timestamps;  5  minutes
                var _quota = 30;

                var _abiDefinition = JSON.parse(data['contracts'][contractName].interface);
                var _bytecode = data['contracts'][contractName].bytecode;

                var courseEscrowContract = this.web3.eth.contract(_abiDefinition);
                console.log(courseEscrowContract);

                var metaMaskAccount = '0xA095ef6ece790a59B75ffB1934023c5130dFc7C3';

                var sender = metaMaskAccount;
                courseEscrowContract.new(_coursePrice, _enrollStart, _enrollEnd, _quota, _refundTime,
                    {from: sender, data: _bytecode, gas: 1000000}, (err, txHash) => {
                            console.log("txHash is: ");
                            console.log(txHash.transactionHash);
                            var blockWatch = __this.web3.eth.filter('latest');
                            blockWatch.watch(function (err, block) {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                                __this.web3.eth.getTransactionReceipt(txHash.transactionHash, function (err, receipt) {
                                    if (receipt) {
                                        if (receipt.contractAddress) {
                                            console.log(receipt.contractAddress);
                                            blockWatch.stopWatching();
                                        }
                                    }
                                })
                            })
                        })
            }, error => console.log(error)
        )

    }

    onGetContractInfo(){
        var contractName = 'courseEscrow';
        var contract_address = '0xbe9edea19028095430f10ab177fdd7fa7e069113';

        this.adminService.getContractInterface().subscribe(
            data => {
                data = JSON.parse(data);
                var _abiDefinition = JSON.parse(data['contracts'][contractName].interface);
                var courseEscrowContract = this.web3.eth.contract(_abiDefinition);
                var contractInstance = courseEscrowContract.at(contract_address);

                console.log(contractInstance.enrollStart.call(
                    (err,result) => console.log(result.toNumber())
                ))
            },
            error => {console.log(error)}

        )
    }

    onGetContractBalance(){
        var contractName = 'courseEscrow';
        var contract_address = '0xbe9edea19028095430f10ab177fdd7fa7e069113';
        this.web3.eth.getBalance(contract_address, (err,data) =>
            {
                console.log(data.toNumber())
                var balance = this.web3.fromWei(data, "ether");
                console.log(balance.toNumber());
            })

    }

    onCollectMoney(){

        var this3 = this;
        var contractName = 'courseEscrow';
        var contract_address = '0xbe9edea19028095430f10ab177fdd7fa7e069113';

        this.adminService.getContractInterface().subscribe(
            data =>{
                data = JSON.parse(data);
                var _abiDefinition = JSON.parse(data['contracts'][contractName].interface);
                var courseEscrowContract = this.web3.eth.contract(_abiDefinition);
                var contractInstance = courseEscrowContract.at(contract_address);
                contractInstance.receiveTuition.sendTransaction(
                    {from:this3.web3.eth.accounts[0], gas:300000},  (err,data) => {
                        if(!err){
                            console.log(data);
                            var event = contractInstance.GotTuition(function(error, result){
                                if (!error)
                                    console.log(result);
                            });
                        }
                    })},
            error => {console.log(error)}
        )


    }

}


