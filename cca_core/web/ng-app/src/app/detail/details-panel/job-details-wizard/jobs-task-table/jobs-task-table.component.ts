import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { JobTask } from "../../../../core/model/minion/job";
import { JobUtilityService } from "../../../../core/job/job-utility.service";

@Component ( {
  selector: 'cca-jobs-task-table',
  templateUrl: './jobs-task-table.component.html',
  styleUrls: [ './jobs-task-table.component.scss' ]
} )
export class JobsTaskTableComponent implements OnInit {
  dataSource                    = new MatTableDataSource<any> ();
  @Input () jobTasks: JobTask[] = [];
  displayedColumns: string[]    = [ 'taskType', 'identifier', 'comment' ];

  @ViewChild ( MatPaginator )
  paginator: MatPaginator;
  @ViewChild ( MatSort )
  sort: MatSort;

  constructor ( private jobUtilityService: JobUtilityService ) {
  }

  ngOnInit () {
    this.dataSource.data      = this.jobTasks;
    this.sort.disableClear    = true;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;

    this.dataSource.sortingDataAccessor = ( task: any, property: string ) => {
      let sortValue: any;

      switch ( property ) {
        case 'taskType':
          sortValue = task.type ? task.type.toLowerCase () : null;
          break;
        case 'identifier':
          sortValue = task.identifier ? task.identifier.toString ().toLowerCase () : null;
          break;
        case 'comment':
          sortValue = task.status && task.status.message ? task.status.message.toLowerCase () : null;
          break;
        default:
          sortValue = task[ property ];
          break;
      }
      return sortValue;
    };
  }
}
