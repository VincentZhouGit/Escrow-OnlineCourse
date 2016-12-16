import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";


@Injectable()
export class AdminService {
    constructor(private http: Http) {}

    getContractInterface(){
        return this.http.get('http://localhost:3000/contract')
            .map((response: Response) => response.json().obj)
            .catch((error: Response) => Observable.throw(error.json()));
    }


}
