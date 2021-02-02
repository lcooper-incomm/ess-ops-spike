import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationContactSectionComponent } from './location-contact-section.component';
import { TestCoreModule } from 'src/app/test/test-core.module';
import { Selection } from 'src/app/core/session/model/selection';
import { Location } from 'src/app/core/node/location/location';
import { CsCorePhoneNumber, CsCorePhoneNumberType } from '@cscore/core-client-model';
import { By } from '@angular/platform-browser';
import { DictionaryService } from 'src/app/core/dictionary/dictionary.service';

describe ( 'LocationContactSectionComponent', () => {
  beforeEach ( () => {
    TestBed.configureTestingModule ( {
      providers: [ DictionaryService ],
      imports: [],
    } );
  } );

  let component: LocationContactSectionComponent;
  let fixture: ComponentFixture<LocationContactSectionComponent>;

  function testEmail ( email: string, expectationFailOutput?: string ): void {
    component.selection.data.emailAddress = email;
    fixture.detectChanges ();

    if ( email ) {
      const valueElem = fixture.debugElement.query ( By.css ( '.location-email .value-container' ) );
      expect ( valueElem ).toBeTruthy ( 'email key-value row was missing' );
      expect ( valueElem.nativeElement.textContent ).toBe ( email, expectationFailOutput );
    } else {
      const valueElem = fixture.debugElement.query ( By.css ( '.location-email' ) );
      expect ( valueElem ).toBeTruthy ( 'email key-value row was missing' );
      expect ( valueElem.nativeElement.textContent ).toContain ( 'Not Available', expectationFailOutput );
    }
  }

  function testManagerName ( managerName: string, expectationFailOutput?: string ): void {
    component.selection.data.managerName = managerName;
    fixture.detectChanges ();

    if ( managerName ) {
      const valueElem = fixture.debugElement.query ( By.css ( '.location-manager-name .value-container' ) );
      expect ( valueElem ).toBeTruthy ( 'manager name key-value row was missing' );
      expect ( valueElem.nativeElement.textContent ).toBe ( managerName, expectationFailOutput );
    } else {
      const valueElem = fixture.debugElement.query ( By.css ( '.location-manager-name' ) );
      expect ( valueElem ).toBeTruthy ( 'manager name key-value row was missing' );
      expect ( valueElem.nativeElement.textContent ).toContain ( 'Not Available', expectationFailOutput );
    }
  }

  function testPhoneNumber ( phoneNumbers: CsCorePhoneNumber[], expectedValue: string, expectationFailOutput?: string ): void {
    component.selection.data.phoneNumbers = phoneNumbers;
    fixture.detectChanges ();

    if ( phoneNumbers.length ) {
      const valueElem = fixture.debugElement.query ( By.css ( '.location-phone .value-container' ) );
      expect ( valueElem ).toBeTruthy ( 'phone key-value row was missing' );
      expect ( valueElem.nativeElement.textContent ).toBe ( expectedValue, expectationFailOutput );
    } else {
      const valueElem = fixture.debugElement.query ( By.css ( '.location-phone' ) );
      expect ( valueElem ).toBeTruthy ( 'phone key-value row was missing' );
      expect ( valueElem.nativeElement.textContent ).toContain ( 'Not Available', expectationFailOutput );
    }
  }

  beforeEach ( async ( () => {
    TestBed.configureTestingModule ( {
      declarations: [ LocationContactSectionComponent ],
      imports: [ TestCoreModule ],
    } )
      .compileComponents ();
  } ) );

  beforeEach ( () => {
    fixture                  = TestBed.createComponent ( LocationContactSectionComponent );
    component                = fixture.componentInstance;
    component.selection      = new Selection<Location> ();
    component.selection.data = new Location ( {} );
    fixture.detectChanges ();
  } );

  it ( 'should display manager name', () => {
    testManagerName ( undefined, 'missing manager name was incorrect' );
    testManagerName ( 'David', 'manager name "David" was incorrect' );
    testManagerName ( 'John', 'manager name "John" was incorrect' );
  } );

  it ( 'should display preferred phone number', () => {
    const workNumber     = new CsCorePhoneNumber ( {
      number: '1234567890',
      type: CsCorePhoneNumberType.WORK,
    } );
    const mobileNumber   = new CsCorePhoneNumber ( {
      number: '0987654321',
      type: CsCorePhoneNumberType.MOBILE,
    } );
    const homeNumber     = new CsCorePhoneNumber ( {
      number: '5555555555',
      type: CsCorePhoneNumberType.HOME,
    } );
    const landlineNumber = new CsCorePhoneNumber ( {
      number: '5555555555',
      type: CsCorePhoneNumberType.LANDLINE,
    } );

    testPhoneNumber ( [ homeNumber, landlineNumber, mobileNumber, workNumber ], workNumber.number, 'work number was not prioritized' );
    testPhoneNumber ( [ homeNumber, landlineNumber, mobileNumber ], mobileNumber.number, 'mobile number was not prioritized' );
    testPhoneNumber ( [ homeNumber, landlineNumber ], homeNumber.number, 'first number (home) was not prioritized' );
    testPhoneNumber ( [ landlineNumber, homeNumber ], landlineNumber.number, 'first number (landline) was not prioritized' );
    testPhoneNumber ( [], 'Not Available', 'missing phone number was incorrect' );
  } );

  it ( 'should display email', () => {
    testEmail ( undefined, 'missing email was incorrect' );
    testEmail ( 'matthew@example.com', 'email "matthew@example.com" was incorrect' );
    testEmail ( 'mark@example.com', 'email "mark@example.com" was incorrect' );
  } );
} );
