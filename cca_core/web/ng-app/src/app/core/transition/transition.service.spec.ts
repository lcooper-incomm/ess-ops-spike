import { inject, TestBed } from '@angular/core/testing';

import { TransitionService } from './transition.service';

describe ( 'TransitionService', () => {
  beforeEach ( () => {
    TestBed.configureTestingModule ( {
      providers: [ TransitionService ]
    } );
  } );

  it ( 'should be created', inject ( [ TransitionService ], ( service: TransitionService ) => {
    expect ( service ).toBeTruthy ();
  } ) );
} );
