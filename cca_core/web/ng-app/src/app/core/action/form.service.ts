import { Injectable } from '@angular/core';
import { TaskResponse } from "../model/minion/task-response";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { TaskSendableForm } from "../model/minion/task/task-sendable-form";
import { Observable } from "rxjs";

const buildTaskResponse = map ( value => new TaskResponse ( value ) );

@Injectable ( {
  providedIn: 'root'
} )
export class FormService {

  constructor ( private http: HttpClient ) {
  }

  sendForm ( request: TaskSendableForm ): Observable<TaskResponse> {
    return this.http.post ( `/rest/form`, request )
      .pipe ( buildTaskResponse );
  }
}
