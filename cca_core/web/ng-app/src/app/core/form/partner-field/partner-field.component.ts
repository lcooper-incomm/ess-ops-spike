import { Component, Input } from '@angular/core';
import { Partner } from "../../session/selection/partner";
import { FormGroup } from "@angular/forms";
import { CcaBaseComponent } from '../../cca-base-component';

@Component ( {
  selector: 'cca-partner-field',
  templateUrl: './partner-field.component.html',
  styleUrls: [ './partner-field.component.scss' ]
} )
export class PartnerFieldComponent extends CcaBaseComponent {

  @Input ()
  form: FormGroup;
  @Input ()
  controlName: string       = 'partner';
  @Input ()
  partnerOptions: Partner[] = [];
  @Input ()
  placeholder: string       = 'Partner';
}
