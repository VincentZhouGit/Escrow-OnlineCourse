import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";


@Injectable()
export class AdminService {
    constructor(private http: Http) {}

    deployContract() {
        console.log("reach here !");
        const body = JSON.stringify({"action": "deploy a contract"});
        console.log("reach here2 !");
        const headers = new Headers({'Content-Type': 'application/json'});
        console.log("reach here3 !");
        return this.http.post('http://localhost:3000/contract', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }


}
