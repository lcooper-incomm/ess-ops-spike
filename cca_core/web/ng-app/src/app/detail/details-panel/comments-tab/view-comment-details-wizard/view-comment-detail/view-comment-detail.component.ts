import { Component, OnInit, ViewChild } from '@angular/core';
import { WizardPage } from "../../../../../core/wizard/wizard-page";
import { ViewCommentDetailsWizard } from "../view-comment-details-wizard";
import { FormGroup } from "@angular/forms";
import { CommentService } from "../../../../../core/comment/comment.service";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { WizardWidth } from "../../../../../core/wizard/wizard-width.enum";
import { CommentDetailResponse } from "../../../../../core/comment/comment-detail-response";
import * as _ from "lodash";
import { Identifier } from "../../../../../core/session/model/identifier";

@Component ( {
  selector: 'cca-view-comment-detail',
  templateUrl: './view-comment-detail.component.html',
  styleUrls: [ './view-comment-detail.component.scss' ]
} )
export class ViewCommentDetailComponent extends WizardPage<ViewCommentDetailsWizard> implements OnInit {
  commentDetail: CommentDetailResponse;
  dataSource                 = new MatTableDataSource<Identifier> ();
  displayedColumns: string[] = [ 'platform', 'type', 'id' ];
  key: string                = 'form-page';
  loadingState: boolean      = true;
  wizardForm: FormGroup      = new FormGroup ( {} );

  @ViewChild ( MatSort )
  sort: MatSort;

  @ViewChild ( MatPaginator )
  paginator: MatPaginator;

  constructor ( private commentService: CommentService ) {
    super ();
    this.closeButtonText = 'Close';
    this.isBackable      = false;
    this.isCloseable     = true;
    this.isNextable      = false;
    this.width           = WizardWidth.MEDIUM;
  }

  ngOnInit () {
    this.dataSource.sort      = this.sort;
    this.dataSource.paginator = this.paginator;

    this.dataSource.sortingDataAccessor = ( item: Identifier, property ) => {
      let sortValue: any;
      switch ( property ) {
        case 'platform':
          sortValue = item.platform ? item.platform : null;
          break;
        case 'type':
          sortValue = item.type ? item.type : null;
          break;
        case 'id':
          sortValue = item.id ? item.id.toString () : null;
          break;
        default:
          sortValue = item[ property ];
          break;
      }
      return sortValue;
    };
    this.getCommentsDetail ()
  }

  private getCommentsDetail (): void {
    this.commentService.getCommentDetails ( this.wizard.model.comment.id )
      .subscribe ( ( detail: CommentDetailResponse ) => {
        this.commentDetail   = _.cloneDeep ( detail );
        this.dataSource.data = _.cloneDeep ( detail.identifiers );
        this.loadingState    = false;
      } )
  }

  getOwnerString ( createdBy ): string {
    let str;
    // Avoid displaying null values.
    if ( createdBy.username ) {
      str = createdBy.username
    }
    if ( createdBy.department ) {
      str += ` ( ${createdBy.department} )`
    }
    return str;
  }
}
