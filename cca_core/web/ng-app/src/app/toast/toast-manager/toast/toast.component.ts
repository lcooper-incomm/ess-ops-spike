import { Component, Input, OnInit } from '@angular/core';
import { Toast } from '../../toast';
import { ToastType } from "../../toast-type.enum";
import { CcaBaseComponent } from "../../../core/cca-base-component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";
import { ClearToastAction } from "../../action/clear-toast-action";

@Component ( {
  selector: 'cca-toast',
  templateUrl: './toast.component.html',
  styleUrls: [ './toast.component.scss' ]
} )
export class ToastComponent extends CcaBaseComponent implements OnInit {

  className: string;
  icon: string;
  splunkLink: string;
  @Input ()
  toast: Toast;
  @Input ()
  showCorrelationId: boolean = false;

  constructor ( private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.setClassName ();
    this.setIcon ();
    this.setSplunkLink ();
  }

  dismiss (): void {
    this.store.dispatch ( new ClearToastAction ( this.toast ) );
  }

  setClassName (): void {
    this.className = this.toast.type ? this.toast.type.toLowerCase () : 'info';
  }

  setIcon (): void {
    switch ( this.toast.type ) {
      case ToastType.ERROR:
      case ToastType.WARN:
        this.icon = 'exclamation';
        break;
      case ToastType.SUCCESS:
        this.icon = 'check';
        break;
      default:
        this.icon = 'info';
        break;
    }
  }

  setSplunkLink (): void {
    if ( this.showCorrelationId ) {
      this.splunkLink = 'http://splunk.incomm.com/en-US/app/search/search?q=search%20' + this.toast.correlationId + '&display.page.search.mode=smart&earliest=-24h%40h&latest=now';
    }
  }
}
