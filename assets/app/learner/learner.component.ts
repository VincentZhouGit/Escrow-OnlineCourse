import { Component } from '@angular/core';
import 'web3';
import { LearnerService } from "./learner.service";

declare var Web3: any;
declare var window:any


@Component({
    selector: 'app-learner',
    template: `
        <h3>Hello, this is the learner page.</h3>

        <div >
            <button class="btn btn-primary" (click)="onPurchase()">Purchase</button>
        </div>
        
        <div >
            <button class="btn btn-primary" (click)="onRefund()">Refund</button>
        </div>
        
    `,
    providers: [LearnerService]
})
export class LearnerComponent {

    web3: any;

    constructor(private learnerService: LearnerService) {}

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


    onPurchase(){
        var this2 = this;
        var contractName = 'courseEscrow';
        var contract_address = '0xbe9edea19028095430f10ab177fdd7fa7e069113';

        this.learnerService.getContractInterface().subscribe(
            data => {
                data = JSON.parse(data);
                var _abiDefinition = JSON.parse(data['contracts'][contractName].interface);
                var courseEscrowContract = this.web3.eth.contract(_abiDefinition);
                var contractInstance = courseEscrowContract.at(contract_address);
                contractInstance.purchaseCourse.sendTransaction(
                    {from:this2.web3.eth.accounts[0], value: 500000,gas:300000},  (err,data) => {
                        if(!err){
                            console.log(data);
                            var event = contractInstance.PurchasedCourse(function(error, result){
                                if (!error)
                                    console.log(result);
                            });
                        }
                    })
            }, error => {console.log(error)}

        )
    }

    onRefund(){
        var this3 = this;
        var contractName = 'courseEscrow';
        var contract_address = '0xbe9edea19028095430f10ab177fdd7fa7e069113';

        this.learnerService.getContractInterface().subscribe(
            data =>{
                data = JSON.parse(data);
                var _abiDefinition = JSON.parse(data['contracts'][contractName].interface);
                var courseEscrowContract = this.web3.eth.contract(_abiDefinition);
                var contractInstance = courseEscrowContract.at(contract_address);
            contractInstance.withdraw.sendTransaction(
                {from:this3.web3.eth.accounts[0], gas:300000},  (err,data) => {
                    if(!err){
                        console.log(data);
                        var event = contractInstance.WithdrawedCourse(function(error, result){
                            if (!error)
                                console.log(result);
                        });
                    }
                })},
            error => {console.log(error)}
        )


    }

}
