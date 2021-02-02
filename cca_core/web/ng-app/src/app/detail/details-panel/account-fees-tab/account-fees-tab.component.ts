import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {debounceTime} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {MaplesAccountFee, MaplesAccountFeeType} from '@cscore/maples-client-model';
import {CsCoreTableColumn} from '@cscore/components';
import {CcaBaseComponent} from '../../../core/cca-base-component';
import {Selection} from '../../../core/session/model/selection';
import {SpinnerComponent} from '../../../core/spinner/spinner.component';
import {AppState} from '../../../app-state';
import {SecurityService} from '../../../core/security/security.service';
import {AppStateType} from '../../../app-state-type.enum';
import {SessionState} from '../../../core/session/session-state';

@Component({
  selector: 'cca-account-fees-tab',
  templateUrl: './account-fees-tab.component.html',
  styleUrls: ['./account-fees-tab.component.scss']
})
export class AccountFeesTabComponent extends CcaBaseComponent implements OnInit {

  dataSource = new MatTableDataSource<MaplesAccountFeeType>();
  accountFee: MaplesAccountFee;
  selection: Selection<any>;

  filterControl: FormControl;
  filterForm: FormGroup = new FormGroup({});

  columns: CsCoreTableColumn<MaplesAccountFeeType>[] = [
    {
      key: 'type',
      label: 'Type',
      getValue: (feeType: MaplesAccountFeeType) => feeType.type
    },
    {
      key: 'name',
      label: 'Name',
      getValue: (feeType: MaplesAccountFeeType) => feeType.name
    },
    {
      key: 'category',
      label: 'Category',
      getValue: (feeType: MaplesAccountFeeType) => feeType.category
    },
    {
      key: 'description',
      label: 'Description',
      getValue: (feeType: MaplesAccountFeeType) => feeType.description
    },
    {
      key: 'amount',
      label: 'Amount',
      getValue: (feeType: MaplesAccountFeeType) => feeType.amount && feeType.amount.displayValue
    }
  ];

  @ViewChild('feePlanSpinner')
  feePlanSpinner: SpinnerComponent;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(private store: Store<AppState>,
              public securityService: SecurityService) {
    super();
  }

  ngOnInit() {
    this.initDataSource();
    this.initForm();
    this.subscribeToSessionState();
    this.subscribeToFilterChanges();
  }

  private initDataSource(): void {
    this.dataSource.paginator           = this.paginator;
    this.dataSource.filterPredicate     = (feeType: MaplesAccountFeeType, filterValue: string): boolean => {
      return (feeType.description && feeType.description.toLowerCase().indexOf(filterValue) !== -1)
        || (feeType.amount && feeType.amount.displayValue && feeType.amount.displayValue.indexOf(filterValue) !== -1)
        || (feeType.category && feeType.category.toLowerCase().indexOf(filterValue) !== -1)
        || (feeType.type && feeType.type.toLowerCase().indexOf(filterValue) !== -1)
        || (feeType.name && feeType.name.toLowerCase().indexOf(filterValue) !== -1);
    };
    this.dataSource.sortingDataAccessor = (feeType: MaplesAccountFeeType, property: string) => {
      let sortValue: any;

      switch (property) {
        case 'type':
          sortValue = feeType.type ? feeType.type.toLowerCase() : null;
          break;
        case 'name':
          sortValue = feeType.name ? feeType.name.toLowerCase() : null;
          break;
        case 'category':
          sortValue = feeType.category ? feeType.category.toLowerCase() : null;
          break;
        case 'description':
          sortValue = feeType.description ? feeType.description.toLowerCase() : null;
          break;
        default:
          sortValue = feeType[property];
          break;
      }

      return sortValue;
    };
  }

  private initForm(): void {
    this.filterControl = new FormControl('', []);
    this.filterForm    = new FormGroup({
      filter: this.filterControl
    });
  }

  private subscribeToFilterChanges(): void {
    this.addSubscription(
      this.filterControl.valueChanges
        .pipe(debounceTime(500))
        .subscribe((value: string) => {
          if (value) {
            value = value.trim();
            value = value.toLowerCase();
          }
          this.dataSource.filter = value;
        })
    );
  }

  private subscribeToSessionState(): void {
    this.addSubscription(
      this.store.select(AppStateType.SESSION_STATE)
        .subscribe((state: SessionState) => {
          if (state && state.selection) {
            this.selection = state.selection;

            if (state.selection.getCustomerAccount().fees.length > 0) {
              this.accountFee = this.selection.getCustomerAccount().fees[0];
              if (this.accountFee) {
                this.dataSource.data = this.accountFee.feeShortTypes;
              } else {
                this.dataSource.data = [];
              }
            } else {
              this.dataSource.data = [];
            }
          }
        })
    );
  }
}
