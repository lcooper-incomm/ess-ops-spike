import { TestBed } from '@angular/core/testing';

import { UpdateAccountRequestBuilder } from './update-account-request-builder.service';

describe ( 'UpdateAccountRequestBuilderService', () => {
  beforeEach ( () => TestBed.configureTestingModule ( {} ) );

  it ( 'should be created', () => {
    const service: UpdateAccountRequestBuilder = TestBed.get ( UpdateAccountRequestBuilder );
    expect ( service ).toBeTruthy ();
  } );
} );
