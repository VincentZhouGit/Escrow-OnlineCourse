import { Component } from '@angular/core';
import {AdminService} from "./admin.service";

@Component({
    selector: 'app-admin',
    template: `
        <h3>Hello, this is the admin page.</h3>
        <div >
            <button class="btn btn-primary" (click)="onDeploy()">Deploy</button>
        </div>
    `,
    providers:[AdminService]
})
export class AdminComponent {
    constructor(private adminService: AdminService){}

    onDeploy(){
        this.adminService.deployContract().subscribe(
            data => console.log(data),
            error => console.log(error)
        );
    }


}

