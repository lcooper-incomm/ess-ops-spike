import { Component, OnInit } from '@angular/core';
import { CcaBaseComponent } from "../../../cca-base-component";
import { interval } from "rxjs";
import { DatePipe } from "@angular/common";
import { MatDialogRef } from "@angular/material";

@Component ( {
  selector: 'cca-session-timeout-dialog',
  templateUrl: './session-timeout-dialog.component.html',
  styleUrls: [ './session-timeout-dialog.component.scss' ],
  providers: [ DatePipe ]
} )
export class SessionTimeoutDialogComponent extends CcaBaseComponent implements OnInit {

  private expirationDate: Date = new Date ( new Date ().getTime () + (1000 * 60) );

  timeRemaining: string;

  constructor ( private date: DatePipe,
                private dialogRef: MatDialogRef<SessionTimeoutDialogComponent> ) {
    super ();
  }

  ngOnInit () {
    this.updateCountdown ();
    this.startCountdown ();
  }

  private startCountdown (): void {
    this.addSubscription (
      interval ( 1000 ).subscribe ( {
        next: value => this.updateCountdown ()
      } )
    );
  }

  private updateCountdown (): void {
    let duration: number = this.expirationDate.getTime () - new Date ().getTime ();
    if ( duration > 0 ) {
      this.timeRemaining = this.date.transform ( new Date ( duration ), '0:ss' );
    } else {
      this.dialogRef.close ( false );
    }
  }
}
