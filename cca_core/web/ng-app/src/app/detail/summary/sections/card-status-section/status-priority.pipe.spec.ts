import { StatusPriorityPipe } from './status-priority.pipe';

describe ( 'StatusPriorityPipe', () => {
  it ( 'create an instance', () => {
    const pipe = new StatusPriorityPipe ();
    expect ( pipe ).toBeTruthy ();
  } );
} );
