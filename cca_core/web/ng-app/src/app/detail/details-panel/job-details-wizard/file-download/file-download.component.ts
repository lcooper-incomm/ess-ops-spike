import { Component, Input, OnInit } from '@angular/core';
import { JobFile, JobFilePassword } from "../../../../core/model/minion/job";
import { JobService } from "../../../../core/job/job.service";
import { JobUtilityService } from "../../../../core/job/job-utility.service";

@Component ( {
  selector: 'cca-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: [ './file-download.component.scss' ]
} )
export class FileDownloadComponent implements OnInit {
  downloadedFileName: string;
  filePassword: string;

  @Input ()
  jobFiles: File[];

  constructor ( private jobService: JobService,
                private jobUtilityService: JobUtilityService ) {
  }

  ngOnInit () {
  }

  private clearDownloadData () {
    this.filePassword       = null;
    this.downloadedFileName = null;
  }

  public manageDownload ( jobFile: JobFile, encrypted: boolean ) {
    this.clearDownloadData ();
    this.downloadFile ( jobFile );
    if ( encrypted ) {
      this.getPassword ( jobFile );
    }
  }

  public downloadFile ( jobFile: JobFile ): any {
    this.downloadedFileName = jobFile.name;
    this.jobService.downloadMinionFile ( jobFile )
      .subscribe ( ( response: any ) => {

        this.downloadedFileName = jobFile.name
      } );
  }

  public getPassword ( jobFile: JobFile ) {
    this.jobService.getloadMinionFilePassword ( jobFile )
      .subscribe ( ( response: JobFilePassword ) => {
        this.filePassword = response.password
      } );
  }

  public export ( jobId ) {
    this.jobUtilityService.export ( jobId );
  }
}
