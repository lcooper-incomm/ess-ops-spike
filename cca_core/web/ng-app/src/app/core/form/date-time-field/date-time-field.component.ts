import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {CsCoreTimestamp} from '@cscore/core-client-model';
import {CcaBaseComponent} from '../../cca-base-component';
import {DateService} from '../../date/date.service';

/**
 * This expects the form control passed in to use the CsCoreTimestamp data.  This control itself
 * is a string.  When the string translates in to a valid datetime, then it saves it back as a
 * CsCoreTimestamp.
 * This uses the MOMENT_DATE_TIME_FORMAT in DateService for the time format.  On the control we
 * use a simple regex but invalid dates could still result.  If moment fails then the value is
 * not saved.
 * To control only updating a valid value, this uses its own form for the input.  When the value is
 * null or valid, then it will update the passed in form control.
 */
@Component({
  selector: 'cca-date-time-field',
  templateUrl: './date-time-field.component.html'
})
export class DateTimeFieldComponent extends CcaBaseComponent implements OnInit, OnChanges {

  @Input()
  form: FormGroup;
  @Input()
  controlName: string;
  @Input()
  placeholder: string;

  dateTimeForm: FormGroup = new FormGroup({
    'dateTimeControl': new FormControl(null)
  });

  constructor(private dateService: DateService) {
    super();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['form'] || changes['controlName']) && this.form && this.controlName) {
      this.createForm();
    }
  }

  createForm(): void {
    let sourceControl: AbstractControl = this.form.get(this.controlName);
    let sourceValue: CsCoreTimestamp = sourceControl.value;
    let newValue: string = null;
    if (sourceValue && sourceValue.value) {
      newValue = this.dateService.formatDateToDateTimeString(sourceValue.value);
    }

    let validators: ValidatorFn[] = [Validators.pattern('[0-9]{2}/[0-9]{2}/[0-9]{4} [0-2][0-9]:[0-5][0-9] [AP]M')];
    if (sourceControl.validator) {
      // If source has additional validator such as required then apply it here.
      validators.push(sourceControl.validator);
    }

    // Create the form with the new date time control.
    this.dateTimeForm = new FormGroup({
      'dateTimeControl': new FormControl(newValue, validators)
    });
    // Listen to the value changes and patch the original form control if valid.
    this.dateTimeForm.get('dateTimeControl').valueChanges.subscribe((value: string) => {
      if (this.dateTimeForm.get('dateTimeControl').valid) {
        if (!value || value.length === 0) {
          sourceControl.patchValue(null);
        } else {
          let changedDateTime: CsCoreTimestamp;
          try {
            changedDateTime = this.dateService.buildCsCoreTimestampFromDateTimeString(value);
            if (changedDateTime && changedDateTime.value) {
              sourceControl.patchValue(changedDateTime);
            }
          } catch (e) {
            this.dateTimeForm.get('dateTimeControl').setErrors({'pattern': true});
          }
        }
      }
    });
  }
}
