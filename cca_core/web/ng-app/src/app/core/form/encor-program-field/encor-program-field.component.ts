import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {CcaBaseComponent} from '../../cca-base-component';
import {GenericOption} from '../../model/generic-option';

@Component({
  selector: 'cca-encor-program-field',
  templateUrl: './encor-program-field.component.html'
})
export class EncorProgramFieldComponent extends CcaBaseComponent {
  @Input ()
  form: FormGroup;
  @Input ()
  controlName: string = 'encorProgram';
  @Input ()
  placeholder: string = 'Search Type';

  searchOptions: GenericOption<any>[] = [
    {
      value: 'PenFed',
      displayValue: 'PenFed'
    }
  ];

  ngOnInit(): void {
    this.form.get('encorProgram').setValue('PenFed');
  }
}
