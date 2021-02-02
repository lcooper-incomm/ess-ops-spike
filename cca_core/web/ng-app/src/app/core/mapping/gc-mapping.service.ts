import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GCRequest} from './gc-request';
import {GCResponse} from './gc-response';

@Injectable({
  providedIn: 'root'
})
export class GCMappingService {

  constructor(private http: HttpClient) {
  }

  findAllRequest(): Observable<GCRequest[]> {
    return this.http.get<GCRequest[]>('/rest/greencard/mapping/request');
  }

  createRequest(request: GCRequest): Observable<GCRequest> {
    return this.http.post<GCRequest>('/rest/greencard/mapping/request', request);
  }

  updateRequest(request: GCRequest): Observable<GCRequest> {
    return this.http.put<GCRequest>(`/rest/greencard/mapping/request/${request.id}`, request);
  }

  findAllResponse(): Observable<GCResponse[]> {
    return this.http.get<GCResponse[]>('/rest/greencard/mapping/response');
  }

  createResponse(response: GCResponse): Observable<GCResponse> {
    return this.http.post<GCResponse>('/rest/greencard/mapping/response', response);
  }

  updateResponse(response: GCResponse): Observable<GCResponse> {
    return this.http.put<GCResponse>(`/rest/greencard/mapping/response/${response.id}`, response);
  }
}
