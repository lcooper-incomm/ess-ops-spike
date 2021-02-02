import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { Location } from 'src/app/core/node/location/location';
import { AbstractSelectionAwareComponent } from '../../../abstract-selection-aware/abstract-selection-aware.component';
import { CsCorePhoneNumber, CsCorePhoneNumberType } from '@cscore/core-client-model';

@Component ( {
  selector: 'cca-location-contact-section',
  templateUrl: './location-contact-section.component.html',
  styleUrls: [ './location-contact-section.component.scss' ]
} )
export class LocationContactSectionComponent extends AbstractSelectionAwareComponent<Location> implements OnInit {

  constructor ( store: Store<AppState> ) {
    super ( store );
  }

  ngOnInit () {
    super.init ();
  }

  getPreferredPhoneNumber (): CsCorePhoneNumber {
    const location = this.selection && this.selection.getLocation ();
    const mobile   = () => location.getPhoneNumberByType ( CsCorePhoneNumberType.MOBILE );
    const work     = () => location.getPhoneNumberByType ( CsCorePhoneNumberType.WORK );
    return location && (work () || mobile () || location.phoneNumbers[ 0 ]);
  }
}
