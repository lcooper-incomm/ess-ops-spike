import { inject, TestBed } from '@angular/core/testing';

import { ControlPanelUsersService } from './control-panel-users.service';
import { TestCoreModule } from 'src/app/test/test-core.module';

describe ( 'ControlPanelUsersService', () => {
  beforeEach ( () => {
    TestBed.configureTestingModule ( {
      providers: [ ControlPanelUsersService ],
      imports: [
        TestCoreModule,
      ],
    } );
  } );

  it ( 'should be created', inject ( [ ControlPanelUsersService ], ( service: ControlPanelUsersService ) => {
    expect ( service ).toBeTruthy ();
  } ) );
} );
