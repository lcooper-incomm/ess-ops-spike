import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickLookupWidgetComponent } from './quick-lookup-widget.component';
import { TestCoreModule } from 'src/app/test/test-core.module';

describe ( 'QuickLookupWidgetComponent', () => {
  let component: QuickLookupWidgetComponent;
  let fixture: ComponentFixture<QuickLookupWidgetComponent>;

  beforeEach ( async ( () => {
    TestBed.configureTestingModule ( {
      imports: [ TestCoreModule ],
      declarations: [ QuickLookupWidgetComponent ]
    } )
      .compileComponents ();
  } ) );

  beforeEach ( () => {
    fixture   = TestBed.createComponent ( QuickLookupWidgetComponent );
    component = fixture.componentInstance;
    fixture.detectChanges ();
  } );

  it ( 'should create', () => {
    expect ( component ).toBeTruthy ();
  } );
} );
