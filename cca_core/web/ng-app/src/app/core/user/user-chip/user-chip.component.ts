import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { User } from '../user';
import { SpinnerSize } from "../../spinner/spinner-size.enum";
import { SpinnerComponent } from "../../spinner/spinner.component";
import { UserService } from "../user.service";
import { finalize } from "rxjs/operators";
import { ToastFactory } from "../../../toast/toast-factory.service";
import { truncate, buildKeyValueTooltipText } from '../../utils/string-utils';
import { KeyValue } from '@angular/common';

@Component ( {
  selector: 'cca-user-chip',
  templateUrl: './user-chip.component.html',
  styleUrls: [ './user-chip.component.scss' ]
} )
export class UserChipComponent implements OnInit {

  @Input ()
  user: User;

  isClickable: boolean = false;
  SpinnerSize          = SpinnerSize;
  tooltipText: string;

  @ViewChild ( 'userSpinner' )
  spinner: SpinnerComponent;

  constructor ( private toast: ToastFactory,
                private userService: UserService ) {
  }

  search (): void {
    if ( this.isClickable ) {
      this.spinner.start ();

      this.userService.search ( this.user.username )
        .pipe ( finalize ( () => this.spinner.stop () ) )
        .subscribe ( ( users: User[] ) => {
          if ( users.length === 1 ) {
            this.user = users[ 0 ];
            this.ngOnInit ();
          } else {
            this.toast.info ( 'This username was not found among CCA Users' );
          }
        } );
    }
  }

  ngOnInit () {
    this.setTooltipText ();
    this.isClickable = this.user.username && !this.user.displayName;
  }

  private setTooltipText (): void {
    if ( this.user ) {
      const rows: KeyValue<string, string>[] = [
        { key: 'Name', value: truncate ( this.user.displayName, 30 ) },
        { key: 'Username', value: truncate ( this.user.username, 30 ) },
        { key: 'Title', value: truncate ( this.user.title, 30 ) },
        { key: 'Company', value: truncate ( this.user.company, 30 ) },
        { key: 'Department', value: truncate ( this.user.department, 30 ) },
        { key: 'Email', value: truncate ( this.user.email, 30 ) },
        { key: 'Mobile', value: this.user.mobile ? truncate ( this.user.mobile.number, 30 ) : '' },
        { key: 'Phone', value: this.user.phone ? truncate ( this.user.phone.number, 30 ) : '' },
      ];
      this.tooltipText           = buildKeyValueTooltipText ( rows );
    }
  }

}
