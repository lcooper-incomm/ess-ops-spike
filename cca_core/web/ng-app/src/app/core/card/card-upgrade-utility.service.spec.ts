import { TestBed } from '@angular/core/testing';

import { CardUpgradeUtilityService } from './card-upgrade-utility.service';

describe ( 'CardUpgradeUtilityService', () => {
  beforeEach ( () => TestBed.configureTestingModule ( {} ) );

  it ( 'should be created', () => {
    const service: CardUpgradeUtilityService = TestBed.get ( CardUpgradeUtilityService );
    expect ( service ).toBeTruthy ();
  } );
} );
