import {DeactivateFastcardRequest} from '../../aps/aps-request';

describe ( 'DeactivateFastcardRequest', () => {

  // Make sure the 'deact' action isn't set when wanting to return the card.
  it ( 'it should have return action', () => {
    const data = {
      requestAction: 'return'
    };
    let request: DeactivateFastcardRequest = new DeactivateFastcardRequest(data);
    expect ( request.requestAction ).toBe('return');
  } );

  it ( 'it should have deact action', () => {
    const data = {
      requestAction: 'deact'
    };
    let request: DeactivateFastcardRequest = new DeactivateFastcardRequest(data);
    expect ( request.requestAction ).toBe('deact');
  } );
} );
