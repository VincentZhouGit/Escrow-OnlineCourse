import { Component } from '@angular/core';

@Component({
    selector: 'app-learner',
    template: `
        <h3>Hello, this is the learner page.</h3>
        
        <div class="col-md-8 col-md-offset-2">
            <button class="btn btn-primary" (click)="Purchase()">Purchase</button>
        </div>
    `
})
export class LearnerComponent {}
