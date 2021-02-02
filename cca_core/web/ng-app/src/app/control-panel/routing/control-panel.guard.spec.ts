import { TestBed, inject } from '@angular/core/testing';

import { ControlPanelGuard } from './control-panel.guard';
import { TestCoreModule } from 'src/app/test/test-core.module';

describe ( 'ControlPanelGuard', () => {
  beforeEach ( () => {
    TestBed.configureTestingModule ( {
      providers: [ ControlPanelGuard ],
      imports: [ TestCoreModule ]
    } );
  } );

  it ( 'should ...', inject ( [ ControlPanelGuard ], ( guard: ControlPanelGuard ) => {
    expect ( guard ).toBeTruthy ();
  } ) );
} );
