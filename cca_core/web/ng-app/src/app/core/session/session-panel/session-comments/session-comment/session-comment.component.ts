import { Component, Input, OnInit } from '@angular/core';
import { Comment } from "../../../../model/comment";

@Component ( {
  selector: 'cca-session-comment',
  templateUrl: './session-comment.component.html',
  styleUrls: [ './session-comment.component.scss' ]
} )
export class SessionCommentComponent implements OnInit {

  @Input ()
  comment: Comment;
  @Input ()
  isOnlyComment: boolean = false;
  @Input ()
  isSelected: boolean    = false;

  constructor () {
  }

  ngOnInit () {
  }

}
