import { Component } from '@angular/core';


@Component({
    selector: 'app-learner',
    template: `
        <h3>Hello, this is the learner page.</h3>

        <div >
            <button class="btn btn-primary" (click)="onPurchase()">Purchase</button>
        </div>
    `
})
export class LearnerComponent {
    // onPurchase() {
    //     this.learner.purchaseCourse()();
    // }

}
