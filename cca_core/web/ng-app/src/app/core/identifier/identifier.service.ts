import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IdentifierRequest} from "../session/model/identifier";

@Injectable({
  providedIn: 'root'
})
export class IdentifierService {

  constructor(private http: HttpClient) {
  }

  addOneIdentifierWithComment(request: IdentifierRequest): Observable<any> {
    return this.http.post(`/rest/identifier/comment`, request);
  }
}
