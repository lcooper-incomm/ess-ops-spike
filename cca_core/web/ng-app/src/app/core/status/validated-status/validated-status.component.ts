import { Component, Input } from '@angular/core';

export type ValidatedStatus = 'valid' | 'invalid' | 'none';

@Component ( {
  selector: 'cca-validated-status',
  templateUrl: './validated-status.component.html',
  styleUrls: [ './validated-status.component.scss' ]
} )
export class ValidatedStatusComponent {
  @Input ()
  status: ValidatedStatus = 'none';
}
