import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AbstractSelectionAwareComponent} from '../../../abstract-selection-aware/abstract-selection-aware.component';
import {MaplesAccount} from '@cscore/maples-client-model';
import {Store} from '@ngrx/store';
import {AppState} from 'src/app/app-state';

@Component ( {
  selector: 'cca-customer-account-account-section',
  templateUrl: './customer-account-account-section.component.html',
  styleUrls: [ './customer-account-account-section.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class CustomerAccountAccountSectionComponent extends AbstractSelectionAwareComponent<MaplesAccount> implements OnInit {

  constructor ( store: Store<AppState>,
                changeDetectorRef: ChangeDetectorRef ) {
    super ( store, changeDetectorRef );
  }

  ngOnInit () {
    super.init ();
  }

  get account (): MaplesAccount {
    return this.selection && this.selection.getCustomerAccount ();
  }
}
