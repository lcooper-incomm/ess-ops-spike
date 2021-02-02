import { inject, TestBed } from '@angular/core/testing';

import { SearchParameterFormBuilder } from './search-parameter-form-builder.service';

describe ( 'SearchParameterFormBuilder', () => {
  beforeEach ( () => {
    TestBed.configureTestingModule ( {
      providers: [ SearchParameterFormBuilder ]
    } );
  } );

  it ( 'should be created', inject ( [ SearchParameterFormBuilder ], ( service: SearchParameterFormBuilder ) => {
    expect ( service ).toBeTruthy ();
  } ) );
} );
