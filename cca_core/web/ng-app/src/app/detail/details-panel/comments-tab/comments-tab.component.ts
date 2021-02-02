import {Component, OnInit, ViewChild} from '@angular/core';
import {CcaBaseComponent} from "../../../core/cca-base-component";
import {CommentContainer, CommentService} from "../../../core/comment/comment.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../app-state";
import {AppStateType} from "../../../app-state-type.enum";
import {SessionState} from "../../../core/session/session-state";
import {Page} from "../../../core/model/page";
import {Comment} from "../../../core/model/comment";
import {Selection} from "../../../core/session/model/selection";
import {AppendSelectionCommentsAction, SetSelectionCommentDateRangeAction, SetSelectionCommentsAction} from '../../../core/session/action/session-actions';
import {debounceTime, finalize, map, tap} from "rxjs/operators";
import {PlatformType} from "../../../core/platform/platform-type.enum";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {ToastFactory} from "../../../toast/toast-factory.service";
import {ViewCommentDetailsWizard} from "./view-comment-details-wizard/view-comment-details-wizard";
import {WizardRunner} from "../../../core/wizard/wizard-runner/wizard-runner.service";
import {MaplesDateRange, MaplesPlatform} from '@cscore/maples-client-model';
import {DateService} from 'src/app/core/date/date.service';
import * as moment from 'moment';
import {DateRangeService} from 'src/app/core/date/date-range.service';

@Component ( {
  selector: 'cca-comments-tab',
  templateUrl: './comments-tab.component.html',
  styleUrls: [ './comments-tab.component.scss' ]
} )
export class CommentsTabComponent extends CcaBaseComponent implements OnInit {

  dataSource                 = new MatTableDataSource<Comment> ();
  dateRangeForm: FormGroup   = new FormGroup({});
  displayedColumns: string[] = [];
  filterControl: FormControl;
  filterForm: FormGroup      = new FormGroup ( {} );
  PlatformType               = PlatformType;
  searching: boolean = false;
  selection: Selection<any>;

  @ViewChild ( MatPaginator )
  paginator: MatPaginator;
  @ViewChild ( MatSort )
  sort: MatSort;

  private isInitialLoadTriggered: boolean = false;

  constructor (
    private commentService: CommentService,
    private dateRangeService: DateRangeService,
    private dateService: DateService,
    private store: Store<AppState>,
    private toastFactory: ToastFactory,
    private wizardRunner: WizardRunner,
  ) {
    super ();
  }

  ngOnInit () {
    this.initDataSource ();
    this.initForms ();
    this.subscribeToSessionState ();
    this.subscribeToFilterChanges ();
  }

  get isServePlatform(): boolean {
    return this.selection && this.selection.getMaplesPlatform() === MaplesPlatform.SERVE;
  }

  applyDateRange(dateRange: MaplesDateRange): void {
    if (dateRange) {
      this.dateRangeForm.get('startDate').setValue(this.dateService.buildMomentFromDateStringISO(dateRange.startDate).toDate());
      this.dateRangeForm.get('endDate').setValue(this.dateService.buildMomentFromDateStringISO(dateRange.endDate).toDate());
      
      this.loadComments();
    }
  }

  getDefaultDateRange(): MaplesDateRange {
    return {
      startDate: this.dateService.formatMomentToDateStringISO(moment().subtract(6, DateService.MOMENT_MONTH_UNIT)),
      endDate: this.dateService.formatMomentToDateStringISO(moment()),
    };
  }

  loadComments ( page: number = 0 ): void {
    this.searching = true;

    if ( this.selection.platform === PlatformType.SERVE ) {
      this.updateSelectionFromForm();
      this.validateDateRange(this.selection.commentQuery.dateQuery);
      this.commentService.findAllByAccountId ( this.selection.getCustomerAccount ().id, this.selection.commentQuery )
        .pipe (
          finalize ( () => this.searching = false ),
          tap ( ( comments: CommentContainer ) => {
            if ( comments.isPartial ) {
              this.toastFactory.warn ( 'SERVE Comments lookup failed. Only CCA Comments are available.' );
            }
            this.store.dispatch ( new SetSelectionCommentsAction ( comments.comments ) );
          } )
        )
        .subscribe ();
    } else if ( this.selection.platform === PlatformType.VMS ) {
      this.commentService.findAllByCustomerId ( this.selection.getCustomer ().id )
        .pipe (
          finalize ( () => this.searching = false ),
          tap ( ( comments: CommentContainer ) => {
            if ( comments.isPartial ) {
              this.toastFactory.warn ( 'VMS Comments lookup failed. Only CCA Comments are available.' );
            }

            comments.comments.forEach ( ( comment: Comment ) => {
              if ( comment.cardNumber ) {
                comment.system = this.selection.platform;
              } else {
                comment.system = 'CCA';
              }
            } );

            const page = this.packageComments ( comments.comments );

            this.store.dispatch ( new AppendSelectionCommentsAction ( page ) );
          } )
        )
        .subscribe ();
    } else {
      this.commentService.findAllBySelectionId ( this.selection.id, page, 50 )
        .pipe (
          finalize ( () => this.searching = false ),
          map ( ( comments: Page<Comment> ) => {
            if ( page === 0 && this.selection.platform === PlatformType.GREENCARD ) {
              let greencardSystemNote = new Comment ( {
                isGreencardSystemNote: true,
                content: this.selection.getCard ().note,
                system: 'GreenCard'
              } );
              comments.content.unshift ( greencardSystemNote );
            }

            this.store.dispatch ( new AppendSelectionCommentsAction ( comments ) );
          } )
        )
        .subscribe ();
    }
  }

  openEditGreencardNote (): void {

  }

  openCommentDetails ( comment: Comment ): void {
    let wizard              = new ViewCommentDetailsWizard ();
    wizard.model.comment    = comment;
    wizard.model.customerId = this.selection.getCustomer ().id;
    this.wizardRunner.run ( wizard );
  }

  next (): void {
    let page = 0;
    if ( this.selection && this.selection.comments ) {
      page = this.selection.comments.number + 1;
    }
    this.loadComments ( page );
  }

  private initDataSource (): void {
    this.dataSource.paginator           = this.paginator;
    this.sort.disableClear              = true;
    this.dataSource.sort                = this.sort;
    this.dataSource.sortingDataAccessor = ( item, property ) => {
      let sortValue: any;

      switch ( property ) {
        case 'content':
          sortValue = item.content ? item.content.toLowerCase () : null;
          break;
        case 'date':
          sortValue = item.createdDate ? item.createdDate.value : null;
          break;
        case 'user':
          if ( item.createdBy ) {
            sortValue = item.createdBy.displayName ? item.createdBy.displayName : item.createdBy.username;
            sortValue = sortValue.toLowerCase ();
          }
          break;
        default:
          sortValue = item[ property ];
          break;
      }

      return sortValue;
    };
    this.dataSource.filterPredicate     = ( comment: Comment, filterValue: string ): boolean => {
      let isVmsComment   = this.selection.platform === PlatformType.VMS;
      let isServeComment = this.selection.platform === PlatformType.SERVE;

      return (comment.id && comment.id.toString ().indexOf ( filterValue ) !== -1)
        || (comment.createdDate && comment.createdDate.displayValue.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (comment.content && comment.content.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (isVmsComment && comment.cardNumber && comment.cardNumber.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (isVmsComment && comment.system && comment.system.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (isServeComment && comment.system && comment.system.toLowerCase().indexOf(filterValue) !== -1)
        || (comment.createdBy && comment.createdBy.displayName && comment.createdBy.displayName.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (comment.createdBy && !comment.createdBy.displayName && comment.createdBy.username && comment.createdBy.username.toLowerCase ().indexOf ( filterValue ) !== -1);
    };
  }

  private initForms (): void {
    // Filter form
    this.filterControl = new FormControl ( '', [] );
    this.filterForm    = new FormGroup ( { filter: this.filterControl } );

    // Date range form
    const dateRange: MaplesDateRange = this.selection && this.selection.commentQuery && this.selection.commentQuery.dateQuery || this.getDefaultDateRange();
    const startDate: Date = this.dateService.buildMomentFromDateStringISO(dateRange.startDate).toDate();
    const endDate: Date = this.dateService.buildMomentFromDateStringISO(dateRange.endDate).toDate();
    this.dateRangeForm = new FormGroup({
      startDate: new FormControl(startDate, Validators.required),
      endDate: new FormControl(endDate, Validators.required),
    });
  }

  private initTable (): void {
    switch (this.selection.platform) {
      case PlatformType.SERVE:
        this.displayedColumns = ['id', 'system', 'date', 'user', 'content', 'action'];
        break;
      case PlatformType.VMS:
        this.displayedColumns = ['id', 'card', 'system', 'date', 'user', 'content', 'action'];
        break;
      default:
        this.displayedColumns = ['id', 'date', 'user', 'content', 'action'];
    }
  }

  private packageComments ( comments: Comment[] ): Page<Comment> {
    return new Page<Comment> ( {
      first: true,
      last: true,
      number: 0,
      numberOfElements: comments.length,
      size: comments.length,
      totalElements: comments.length,
      totalPages: 1
    }, comments );
  }

  private validateDateRange(dateRange: MaplesDateRange): void {
    const defaultDateRange = this.getDefaultDateRange();
    this.dateRangeService.validateDateRange(dateRange, defaultDateRange.startDate, defaultDateRange.endDate);
  }

  private subscribeToFilterChanges (): void {
    this.addSubscription (
      this.filterControl.valueChanges
        .pipe ( debounceTime ( 500 ) )
        .subscribe ( ( value: string ) => {
          if ( value ) {
            value = value.trim ();
            value = value.toLowerCase ();
          }
          this.dataSource.filter = value;
        } )
    );
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state && state.selection ) {
            this.selection = state.selection;

            if ( !this.displayedColumns.length ) {
              this.initTable ();
            }

            if (state.selection.commentQuery && !this.isInitialLoadTriggered) {
              this.initDateRangeForm(state.selection.commentQuery.dateQuery);
            }
            
            if ( state.selection.comments ) {
              this.dataSource.data = state.selection.comments.content;
            } else if ( !this.isInitialLoadTriggered ) {
              this.isInitialLoadTriggered = true;
              this.dataSource.data        = [];
              this.loadComments ();
            }
          }
        } )
    );
  }

  private initDateRangeForm(dateRange: MaplesDateRange): void {
    this.dateRangeForm = new FormGroup({
      startDate: new FormControl(dateRange && dateRange.startDate, Validators.required),
      endDate: new FormControl(dateRange && dateRange.endDate, Validators.required),
    });
  }

  private updateSelectionFromForm(): void {
    this.selection.commentQuery = {
      dateQuery: {
        startDate: this.dateService.formatDateToDateStringISO(this.dateRangeForm.get('startDate').value),
        endDate: this.dateService.formatDateToDateStringISO(this.dateRangeForm.get('endDate').value),
      }
    };
    this.store.dispatch(new SetSelectionCommentDateRangeAction(this.selection));
  }
}
