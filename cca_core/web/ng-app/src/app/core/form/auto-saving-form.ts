import { OnChanges, Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { CcaBaseComponent } from 'src/app/core/cca-base-component';

export abstract class AutoSavingForm extends CcaBaseComponent implements OnChanges {
  @Input () form: FormGroup;

  private formChangeSubscription: Subscription;

  ngOnChanges ( changes: SimpleChanges ): void {
    if ( 'form' in changes && this.form ) {
      this.subscribeToFormChanges ();
    }
  }

  private subscribeToFormChanges (): void {
    if ( this.formChangeSubscription ) {
      this.formChangeSubscription.unsubscribe ();
    }
    this.formChangeSubscription = this.form.valueChanges
      .pipe (
        debounceTime ( 500 ),
        switchMap ( value => this.autoSave ( value ) ),
      )
      .subscribe ();
    this.addSubscription ( this.formChangeSubscription );
  }

  protected abstract autoSave ( formValue: any ): Observable<void>;
}
