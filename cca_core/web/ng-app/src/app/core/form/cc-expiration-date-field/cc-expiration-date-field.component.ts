import {Component, Input, OnInit} from '@angular/core';
import {CcaBaseComponent} from "../../cca-base-component";
import {FormGroup} from "@angular/forms";
import {lastChar} from "../../utils/string-utils";

@Component({
  selector: 'cca-cc-expiration-date-field',
  templateUrl: './cc-expiration-date-field.component.html',
  styleUrls: ['./cc-expiration-date-field.component.scss']
})
export class CcExpirationDateFieldComponent extends CcaBaseComponent implements OnInit {

  @Input()
  form: FormGroup;
  @Input()
  controlName: string;
  @Input()
  hint: string;
  @Input()
  placeholder: string;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  onKeydown(event) {
    let it = lastChar(this.form.get(this.controlName).value);
    if (it == '/') {
      let newValue = this.form.get(this.controlName).value.substring(0, 2);
      this.form.get(this.controlName).setValue(newValue);
    }
  }

}
