// import { Injectable } from "@angular/core";
// import { Http, Headers, Response } from "@angular/http";
// import 'rxjs/Rx';
// import { Observable } from "rxjs";
//
// @Injectable()
// export class LearnerService {
//     constructor(private http: Http) {}
//
//     purchaseCourse(){
//         const body = JSON.stringify(message);
//         const headers = new Headers({'Content-Type': 'application/json'});
//
//         return this.http.post('http://localhost:3000/message' + token, body, {headers: headers})
//             .map((response: Response) => {
//                 const result = response.json();
//                 const message = new Message(
//                     result.obj.content,
//                     result.obj.user.firstName,
//                     result.obj._id,
//                     result.obj.user._id);
//                 this.messages.push(message);
//                 return message;
//
//     }
//
//
// }
