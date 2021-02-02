import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTabBadgeComponent } from './case-tab-badge.component';

describe ( 'CaseTabBadgeComponent', () => {
  let component: CaseTabBadgeComponent;
  let fixture: ComponentFixture<CaseTabBadgeComponent>;

  beforeEach ( async ( () => {
    TestBed.configureTestingModule ( {
      declarations: [ CaseTabBadgeComponent ]
    } )
      .compileComponents ();
  } ) );

  beforeEach ( () => {
    fixture   = TestBed.createComponent ( CaseTabBadgeComponent );
    component = fixture.componentInstance;
    fixture.detectChanges ();
  } );

  it ( 'should create', () => {
    expect ( component ).toBeTruthy ();
  } );
} );
