import { async, ComponentFixture, TestBed, inject, tick, fakeAsync } from '@angular/core/testing';

import { StatusComponent } from './status.component';
import { CsCoreStatus } from '../../model/cs-core-status';
import { MatTooltipModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { Component, ViewChild } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe ( 'StatusComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let overlayContainerElement: HTMLElement;

  function testDisplayValue ( status: CsCoreStatus | string, expectedDisplayValue: string, caseDescription: string ) {
    component.status = status;
    fixture.detectChanges ();
    const element: Element = fixture.debugElement.query ( By.css ( '.status-container' ) ).nativeElement;
    expect ( component.statusComponent.displayValue ).toBe ( expectedDisplayValue, `display value was incorrect for ${caseDescription}` );
    expect ( element.textContent ).toBe ( expectedDisplayValue, `display value text content was incorrect for ${caseDescription}` )
  }

  function testTooltip ( status: CsCoreStatus | string, expectedTooltipText: string, caseDescription: string ) {
    component.status = status;
    fixture.detectChanges ();

    const element: Element = fixture.debugElement.query ( By.css ( '.status-container' ) ).nativeElement;
    element.dispatchEvent ( new MouseEvent ( 'mouseenter' ) );
    fixture.detectChanges ();

    // wait till animation has finished
    tick ( 500 );

    const tooltipElement = overlayContainerElement.querySelector ( '.mat-tooltip' ) as HTMLElement;
    expect ( component.statusComponent.tooltip ).toBe ( expectedTooltipText, `tooltip was incorrect for ${caseDescription}` );
    expect ( tooltipElement.textContent ).toBe ( expectedTooltipText, `tooltip text content was incorrect for ${caseDescription}` );
  }

  beforeEach ( async ( () => {
    TestBed.configureTestingModule ( {
      declarations: [
        StatusComponent,
        TestHostComponent,
      ],
      imports: [
        MatTooltipModule,
        NoopAnimationsModule,
      ]
    } )
      .compileComponents ();

    inject ( [ OverlayContainer ], ( oc: OverlayContainer ) => {
      overlayContainerElement = oc.getContainerElement ();
    } ) ();
  } ) );

  beforeEach ( () => {
    fixture   = TestBed.createComponent ( TestHostComponent );
    component = fixture.componentInstance;
    fixture.detectChanges ();
  } );

  /* TODO it ( 'should show correct display value', () => {
    testDisplayValue ( 'status', 'Status', 'lower case string status' );
    testDisplayValue ( 'STATUS', 'STATUS', 'upper case string status' );
    testDisplayValue ( 'STATUS', 'STATUS', 'all-caps string status' );
    testDisplayValue ( new CsCoreStatus ( { name: 'NAME' } ), 'Unavailable', 'status with name' );
    testDisplayValue ( new CsCoreStatus ( { description: 'description' } ), 'Description', 'status with lower case description' );
    testDisplayValue ( new CsCoreStatus ( { description: 'Description' } ), 'Description', 'status with upper case description' );
    testDisplayValue ( new CsCoreStatus ( { description: 'DESCRIPTION' } ), 'DESCRIPTION', 'status with all-caps description' );
    testDisplayValue ( new CsCoreStatus ( {
      name: 'NAME',
      description: 'description'
    } ), 'Description', 'status with name and lower case description' );
    testDisplayValue ( new CsCoreStatus ( {
      name: 'NAME',
      description: 'Description'
    } ), 'Description', 'status with name and upper case description' );
    testDisplayValue ( new CsCoreStatus ( {
      name: 'NAME',
      description: 'DESCRIPTION'
    } ), 'DESCRIPTION', 'status with name and all-caps description' );
  } );

  it ( 'should show correct tooltip', fakeAsync ( () => {
    testTooltip ( 'status', 'status', 'lower case string status' );
    testTooltip ( 'Status', 'Status', 'upper case string status' );
    testTooltip ( 'STATUS', 'STATUS', 'all-caps string status' );
    testTooltip ( new CsCoreStatus ( { name: 'name' } ), 'name', 'status with lower case name' );
    testTooltip ( new CsCoreStatus ( { name: 'Name' } ), 'Name', 'status with upper case name' );
    testTooltip ( new CsCoreStatus ( { name: 'NAME' } ), 'NAME', 'status with all-caps name' );
    testTooltip ( new CsCoreStatus ( { description: 'description' } ), 'description', 'status with lower case description' );
    testTooltip ( new CsCoreStatus ( { description: 'Description' } ), 'Description', 'status with upper case description' );
    testTooltip ( new CsCoreStatus ( { description: 'DESCRIPTION' } ), 'DESCRIPTION', 'status with all-caps description' );
    testTooltip ( new CsCoreStatus ( {
      name: 'name',
      description: 'description'
    } ), 'name - description', 'status with lower case name and description' );
    testTooltip ( new CsCoreStatus ( {
      name: 'Name',
      description: 'Description'
    } ), 'Name - Description', 'status with upper case name and description' );
    testTooltip ( new CsCoreStatus ( {
      name: 'NAME',
      description: 'DESCRIPTION'
    } ), 'NAME - DESCRIPTION', 'status with all-caps name and description' );
  } ) );*/
} );

@Component ( {
  selector: 'test',
  template: `<cca-status [status]="status"></cca-status>`
} )
export class TestHostComponent {
  status: CsCoreStatus | string;
  @ViewChild ( StatusComponent ) statusComponent: StatusComponent;
}
