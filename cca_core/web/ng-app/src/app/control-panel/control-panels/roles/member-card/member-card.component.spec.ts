import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberCardComponent } from './member-card.component';
import { TestCoreModule } from 'src/app/test/test-core.module';
import { User } from 'src/app/core/user/user';

describe ( 'MemberCardComponent', () => {
  let component: MemberCardComponent;
  let fixture: ComponentFixture<MemberCardComponent>;

  beforeEach ( async ( () => {
    TestBed.configureTestingModule ( {
      declarations: [ MemberCardComponent ],
      imports: [
        TestCoreModule,
      ],
    } )
      .compileComponents ();
  } ) );

  beforeEach ( () => {
    fixture              = TestBed.createComponent ( MemberCardComponent );
    component            = fixture.componentInstance;
    component.memberData = new User ( null );
    fixture.detectChanges ();
  } );

  it ( 'should create', () => {
    expect ( component ).toBeTruthy ();
  } );
} );
