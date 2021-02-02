import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { JobStatus } from "../../../../core/model/minion/job";

@Component ( {
  selector: 'cca-jobs-status-history-table',
  templateUrl: './jobs-status-history-table.component.html',
  styleUrls: [ './jobs-status-history-table.component.scss' ]
} )
export class JobsStatusHistoryTableComponent implements OnInit {
  dataSource = new MatTableDataSource<any> ();

  @Input () statusHistory: JobStatus[] = [];
            displayedColumns: string[] = [ 'createdDate', 'statusType' ];

  @ViewChild ( MatPaginator )
  paginator: MatPaginator;
  @ViewChild ( MatSort )
  sort: MatSort;

  constructor () {
  }

  ngOnInit () {

    this.dataSource.data      = this.statusHistory;
    this.sort.disableClear    = true;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;

    this.dataSource.sortingDataAccessor = ( status: any, property: string ) => {
      let sortValue: any;

      switch ( property ) {
        case 'createdDate':
          sortValue = status.createdDate && status.createdDate.displayValue ? status.createdDate.displayValue.toLowerCase () : null;
          break;
        case 'statusType':
          sortValue = status.type ? status.type.toLowerCase () : null;
          break;
        default:
          sortValue = status[ property ];
          break;
      }

      return sortValue;
    };
  }

}
