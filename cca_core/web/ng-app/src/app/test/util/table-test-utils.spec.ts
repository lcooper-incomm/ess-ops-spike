/**
 * Because of the `expect` calls in here, this file has to be named with .spec.
 * Otherwise, the TS compiler tries to compile it with the rest of the app and complains.
 */

import { tick, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';

const rowCssSelector: string = 'tbody tr:not(.cscore-table-detail-row)';

export function filter<T> ( fixture: ComponentFixture<T>, filterValue: string ): void {
  const filterInput               = fixture.debugElement.query ( By.css ( 'cca-text-field input.text-field.form-field' ) );
  filterInput.nativeElement.value = filterValue;
  filterInput.nativeElement.dispatchEvent ( new Event ( 'input' ) );

  tick ();
  fixture.detectChanges ();
}

export function sort<T> ( fixture: ComponentFixture<T>, columnId: string, direction: 'asc' | 'desc' ): void {
  const sortDebugElement = fixture.debugElement.query ( By.directive ( MatSort ) );
  const sort             = sortDebugElement.injector.get ( MatSort );
  sort.sort ( {
    id: columnId,
    start: direction,
    disableClear: false,
  } );
  tick ();
  fixture.detectChanges ();
}

export function expectRowCount<T> ( fixture: ComponentFixture<T>, count: number, expectationFailOutput?: string ): void {
  const tableRows: NodeListOf<Element> = fixture.debugElement.nativeElement.querySelectorAll ( rowCssSelector );
  expect ( tableRows.length ).toBe ( count, expectationFailOutput );
}

export function expectPagination<T> ( fixture: ComponentFixture<T>, isPaginationVisible: boolean, expectationFailOutput?: string ): void {
  const paginator: DebugElement = fixture.debugElement.query ( By.directive ( MatPaginator ) );
  const hidden: boolean         = paginator.properties[ 'hidden' ];
  const display: string         = paginator.nativeElement.computedStyleMap ().get ( 'display' ).value;

  expect ( hidden ).toBe ( !isPaginationVisible, expectationFailOutput );
  if ( isPaginationVisible ) {
    expect ( display ).not.toBe ( 'none', expectationFailOutput );
  } else {
    expect ( display ).toBe ( 'none', expectationFailOutput );
  }
}

export function expectSorted<T> ( fixture: ComponentFixture<T>, columnId: string, values: string[], expectationFailOutput?: string ): void {
  const tableHeaderCells: Element[]    = Array.from ( fixture.debugElement.nativeElement.querySelectorAll ( 'thead tr th' ) );
  const columnIndex                    = tableHeaderCells.findIndex ( cell => cell.classList.contains ( `mat-column-${columnId}` ) );
  const tableRows: NodeListOf<Element> = fixture.debugElement.nativeElement.querySelectorAll ( rowCssSelector );
  values.forEach ( ( value, index ) => {
    const cells = tableRows.item ( index ).querySelectorAll ( 'td' );
    expect ( cells.item ( columnIndex ).textContent.trim () ).toBe ( value, `${expectationFailOutput} - row="${index}, value=${value}` );
  } );
}
