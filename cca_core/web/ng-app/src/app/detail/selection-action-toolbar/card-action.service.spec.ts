import { inject, TestBed } from '@angular/core/testing';

import { CardActionService } from './card-action.service';
import { Session } from 'src/app/core/session/model/session';
import { Selection } from 'src/app/core/session/model/selection';
import { Card } from 'src/app/core/card/card';
import { SecurityService } from 'src/app/core/security/security.service';
import { TestCoreModule } from 'src/app/test/test-core.module';
import { MatDialogModule } from '@angular/material';
import { CsCoreStatus } from 'src/app/core/model/cs-core-status';
import { PlatformType } from 'src/app/core/platform/platform-type.enum';
import { CsCoreStatusType } from '../../core/model/cs-core-status';
import { CsCoreCurrency } from '@cscore/gringotts';
import { GreencardStatusType } from '../../core/status/greencard-status/greencard-status-type.enum';
import { mockSession } from 'src/app/test/data/mock-session';

describe ( 'CardActionService', () => {
  let securityService: SecurityService;
  let session: Session;
  let selection: Selection<Card>;

  beforeEach ( () => {
    TestBed.configureTestingModule ( {
      imports: [
        MatDialogModule,
        TestCoreModule,
      ],
      providers: [ CardActionService ]
    } );
  } );

  beforeEach ( () => {
    selection      = new Selection ();
    selection.data = new Card ( {} );

    session            = mockSession ();
    session.selections = [ selection ];

    securityService = TestBed.get ( SecurityService );
    spyOn ( securityService, 'getCurrentUser' ).and.returnValue ( session.user );
    spyOn ( securityService, 'hasAnyPermission' ).and.returnValue ( true );
    spyOn ( securityService, 'hasPermission' ).and.returnValue ( true );
    spyOn ( securityService, 'isCurrentUser' ).and.returnValue ( true );
  } );

  /* TODO
  it ( 'should disable transfer card action when card doesn\'t have Greencard status', inject ( [ CardActionService ], ( service: CardActionService ) => {
    selection.data          = buildCardForTransfer ();
    selection.data.statuses = [];

    service.checkTransferCard ( session, selection ).subscribe ( action => {
      expect ( action.disabledReason ).toBe ( 'Card must have a GreenCard status to perform this action.' );
    } );
  } ) );

  it ( 'should disable transfer card action when balance is null', inject ( [ CardActionService ], ( service: CardActionService ) => {
    selection.data                          = buildCardForTransfer ();
    selection.data.amounts.availableBalance = undefined;

    service.checkTransferCard ( session, selection ).subscribe ( action => {
      expect ( action.disabledReason ).toBe ( 'Card must have a positive balance to perform this action.' );
    } );
  } ) );

  it ( 'should disable transfer card action when balance is 0', inject ( [ CardActionService ], ( service: CardActionService ) => {
    selection.data                          = buildCardForTransfer ();
    selection.data.amounts.availableBalance = new CsCoreCurrency ( { value: 0 } );

    service.checkTransferCard ( session, selection ).subscribe ( action => {
      expect ( action.disabledReason ).toBe ( 'Card must have a positive balance to perform this action.' );
    } );
  } ) );

  it ( 'should disable transfer card action when balance is negative', inject ( [ CardActionService ], ( service: CardActionService ) => {
    selection.data                          = buildCardForTransfer ();
    selection.data.amounts.availableBalance = new CsCoreCurrency ( { value: -1 } );

    service.checkTransferCard ( session, selection ).subscribe ( action => {
      expect ( action.disabledReason ).toBe ( 'Card must have a positive balance to perform this action.' );
    } );
  } ) );

  it ( 'should enable transfer card action', inject ( [ CardActionService ], ( service: CardActionService ) => {
    selection.data = buildCardForTransfer ();

    service.checkTransferCard ( session, selection ).subscribe ( action => {
      // TODO: test permissions check
      expect ( action.disabledReason ).toBeFalsy ();
    } );
  } ) );*/
} );

export function buildCardForTransfer (): Card {
  const card                    = new Card ( {} );
  card.statuses                 = [
    new CsCoreStatus ( {
      name: GreencardStatusType.ACTIVE,
      platform: PlatformType.GREENCARD,
      type: CsCoreStatusType.PLATFORM,
    } )
  ];
  card.amounts.availableBalance = new CsCoreCurrency ( { value: 1 } );

  return card;
}
