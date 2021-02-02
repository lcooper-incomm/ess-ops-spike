import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Comment } from '../model/comment';
import { CommentRequest } from '../model/comment-request';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Page } from "../model/page";
import { CommentDetailResponse } from "./comment-detail-response";
import { MaplesAccountNoteQuery } from '@cscore/maples-client-model';

const build = map ( value => new Comment ( value ) );

const buildDetail = map ( value => new CommentDetailResponse ( value ) );

const buildAll = map ( ( values: any[] ) => {
  let results: Comment[] = [];
  values.forEach ( value => results.push ( new Comment ( value ) ) );
  return results;
} );

const buildPage = map ( ( value: any ) => {
  let comments: Comment[] = [];
  value.content.forEach ( value => comments.push ( new Comment ( value ) ) );
  return new Page<Comment> ( value, comments );
} );


@Injectable ( {
  providedIn: 'root'
} )
export class CommentService {

  constructor ( private http: HttpClient ) {
  }

  addOne ( sessionId: number, comment: CommentRequest ): Observable<Comment> {
    return this.http.post<Comment> ( '/rest/session/' + sessionId + '/comment', comment )
      .pipe ( build );
  }

  findAllByAccountId ( accountId: string, query: MaplesAccountNoteQuery ): Observable<CommentContainer> {
    return this.http.post<CommentContainer> ( `/rest/customer-account/${accountId}/comments/search`, query )
      .pipe ( map ( ( container: any ) => {
        return new CommentContainer ( container );
      } ) );
  }

  findAllByCustomerId ( customerId: string ): Observable<CommentContainer> {
    return this.http.get<CommentContainer> ( `/rest/customer/${customerId}/comment` )
      .pipe ( map ( ( container: any ) => {
        return new CommentContainer ( container );
      } ) );
  }

  findAllBySelectionId ( selectionId: number, page: number = 0, limit: number = 50 ): Observable<Page<Comment>> {
    let params: HttpParams = new HttpParams ()
      .set ( 'page', page.toString () )
      .set ( 'limit', limit.toString () );

    return this.http.get<Page<Comment>> ( `/rest/selection/${selectionId}/comment`, { params: params } )
      .pipe ( buildPage );
  }

  getCommentDetails ( commentId: number ): Observable<CommentDetailResponse> {
    return this.http.get<CommentDetailResponse> ( `/rest/comment/${commentId}/detail` )
      .pipe ( buildDetail );
  }

}

export class CommentContainer {

  isPartial: boolean = false;

  comments: Comment[] = [];

  constructor ( data: any ) {
    if ( data ) {
      this.isPartial = data.isPartial;

      if ( data.comments ) {
        this.comments = data.comments.map ( ( comment: any ) => new Comment ( comment ) );
      }
    }
  }
}
