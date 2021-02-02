import {OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {forkJoin, Observable, of} from "rxjs";
import {catchError, flatMap, map} from "rxjs/operators";
import {CodexAwarePage} from "./codex-aware-page";
import {AbstractWizard} from "./abstract-wizard";
import {WizardWidth} from "./wizard-width.enum";
import {WizardDialogComponent} from './wizard-dialog/wizard-dialog.component';

export abstract class WizardPage<T extends AbstractWizard<any>> extends CodexAwarePage implements OnInit {

  abstract wizardForm: FormGroup;
           actionButtonText: string = 'Action';
           backButtonText: string   = 'Back';
           closeButtonText: string  = 'Close';
           deleteButtonText: string = 'Delete';
           nextButtonText: string   = 'Next';

  isActionable: boolean  = false;
  isBackable: boolean    = false;
  isCloseable: boolean   = false;
  isDeletable: boolean   = false;
  isFailed: boolean      = false;
  isInitialized: boolean = false;
  isIgnored: boolean     = false;
  isNextable: boolean    = false;
  isSkippable: boolean   = false;
  isVisited: boolean     = false;
  stepperWidth: string;
  width: WizardWidth     = WizardWidth.SMALL;
  wizard: T;
  wizardComponent: WizardDialogComponent;

  close = (forceClose: boolean = false): Observable<any> => {
    return of ( null );
  };

  runAndApplyCodex = (): Observable<any> => {
    return of ( null );
  };

  /**
   * The Action button behaves like the Next button and is styled like the close button.
   * Any handling you need done when the user clicks the Action button,
   * but before the wizard actually navigates forward. This is where a next navigation would go.
   *
   *
   * IMPORTANT: The return value here matters! You must return the page key of the next page to load in your observable.
   * If you want the next action to be closing of the dialog, RETURN FALSE OR NULL to trigger that.
   */  onAction(): Observable<any> {
    return of(null);
  }

  /**
   * Any handling you need done when the user clicks the Back button, but before the wizard actually navigates Back.
   */
  onBack (): Observable<any> {
    return of ( null );
  }

  /**
   * Any handling you need done when the user clicks the Cancel button, but before the wizard actually closes.
   */
  onClose (): Observable<any> {
    return of ( null );
  }

  /**
   * The logic to actually handle the delete action.
   */
  onDelete (): Observable<any> {
    return of ( null );
  }

  /**
   * Any handling you need done to load and prepare this page. Note that this is called each time the page is navigated
   * to, including if the user navigates Back. You can use the `isVisited` flag to ensure your logic only runs once if
   * needed.
   */
  onLoad (): Observable<any> {
    return of ( null );
  }

  /**
   * Any handling you need done when the user clicks the Next button, but before the wizard actually navigates forward.
   * This is where your REST calls will typically go.
   *
   *
   * IMPORTANT: The return value here matters! You must return the page key of the next page to load in your observable.
   * If you want the next action to be closing of the dialog, RETURN FALSE OR NULL to trigger that.
   */
  onNext (): Observable<string> {
    return of ( null );
  }

  ngOnInit (): void {
  }

  protected getValueFromForm<T> ( key: string ): T | null {
    return this.wizardForm.get ( key ) ? this.wizardForm.get ( key ).value as T : null;
  }

  protected onFormFieldChange<T> ( field: string, next?: ( value: T ) => void, error?: ( error: any ) => void, complete?: () => void ): void {
    const control = this.wizardForm && this.wizardForm.get ( field );
    control && this.addSubscription ( control.valueChanges.subscribe ( next, error, complete ) );
  }

  /**
   * This is designed to work in wizards where there is an initial call, then secondary calls such as
   * auditing and commenting.  The audit and comment should only be persisted if the initial call is
   * successful.  And what error occurred should be presented to the user.  If no errors, the model
   * has a success flag set to 0.  If the initial call fails, the model has a success of 1.  If any
   * of the secondary calls fail, the success is set to 2.
   *
   * @param callingObject
   * @param model
   * @param initialFunction
   * @param secondaryFunctions
   * @param resultPage
   */
  protected twoStageServiceCall(callingObject: any,
                                model: any,
                                initialFunction: () => Observable<any>,
                                secondaryFunctions: (() => Observable<any>)[],
                                resultPage: string = 'result-page'): Observable<any> {
    return initialFunction.apply(callingObject)
      .pipe(
        // Because of the flatMap, the error must be returned as observable.
        catchError(error => of(error)),
        flatMap((response: any) => {
          if (response instanceof HttpErrorResponse) {
            model.success = 1;
            return of(resultPage);
          }

          // Map the array of functions to call them and pipe their errors as observables.
          return forkJoin(
            secondaryFunctions.map(f => f.apply(callingObject).pipe(catchError(error => of(error))))
          ).pipe(
            map((response: any[]) => {
              model.success = 0;

              // If any response is an error, then success is 2.
              response.forEach(response => {
                if (response instanceof HttpErrorResponse) {
                  model.success = 2;
                }
              });

              return resultPage;
            })
          )
        })
      );
  }
}
