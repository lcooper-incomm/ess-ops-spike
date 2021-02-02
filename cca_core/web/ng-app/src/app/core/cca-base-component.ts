import { OnDestroy } from "@angular/core";
import { Permission } from "./auth/permission";
import { Subscription } from "rxjs";
import { RoutePath } from "./routing/route-path.enum";
import { AbstractControl, FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material";

export abstract class CcaBaseComponent implements OnDestroy {

  instantErrorMatcher: ErrorStateMatcher = new InstantErrorMatcher ();
  Permission                             = Permission;
  RoutePath                              = RoutePath;

  private readonly subscriptionPool: Subscription[] = [];

  ngOnDestroy () {
    this.subscriptionPool.forEach ( subscription => {
      if ( subscription ) {
        subscription.unsubscribe ();
      }
    } );
  }

  addSubscription ( subscription: Subscription ): Subscription {
    this.subscriptionPool.push ( subscription );
    return subscription;
  }

  isControlRequired ( control: AbstractControl ): boolean {
    let isRequired: boolean = false;
    if ( control && control.validator ) {
      let validationResult = control.validator ( {} as AbstractControl );
      isRequired           = validationResult !== null && validationResult.required === true;
    }
    return isRequired;
  }

}

export class InstantErrorMatcher implements ErrorStateMatcher {
  isErrorState ( control: FormControl | null, form: FormGroupDirective | NgForm | null ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
