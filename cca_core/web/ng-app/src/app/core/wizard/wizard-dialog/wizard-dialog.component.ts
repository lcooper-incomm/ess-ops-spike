import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {CodexService} from "../../../codex/codex.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Logger} from "../../../logging/logger.service";
import {ToastFactory} from "../../../toast/toast-factory.service";
import {CcaBaseComponent} from "../../cca-base-component";
import {AbstractWizard} from "../abstract-wizard";
import {ToastDuration} from "../../../toast/toast-duration.enum";
import {forkJoin, interval, Observable, Subject, Subscription, throwError} from "rxjs";
import {catchError, debounceTime, finalize, flatMap, map} from "rxjs/operators";
import {WizardPage} from "../wizard-page";
import {FormGroup} from "@angular/forms";
import {CodexFieldName} from "../codex-field-name";
import {SpinnerComponent} from "../../spinner/spinner.component";
import {DomSanitizer} from "@angular/platform-browser";
import * as $ from "jquery";
import {AuthenticationState} from "../../../auth/authentication-state";
import {snapshot} from "../../store-utils/store-utils";
import {Store} from "@ngrx/store";
import {AppState} from "../../../app-state";
import {AppStateType} from "../../../app-state-type.enum";
import {SessionState} from "../../session/session-state";
import {WizardWidth} from "../wizard-width.enum";

@Component ( {
  selector: 'cca-wizard-dialog',
  templateUrl: './wizard-dialog.component.html',
  styleUrls: [ './wizard-dialog.component.scss' ],
} )

export class WizardDialogComponent extends CcaBaseComponent implements OnInit {

  @ViewChild('actionSpinner')
  actionSpinner: SpinnerComponent;

  @ViewChild ( 'backSpinner' )
  backSpinner: SpinnerComponent;

  @ViewChild ( 'closeSpinner' )
  closeSpinner: SpinnerComponent;

  @ViewChild ( 'nextSpinner' )
  nextSpinner: SpinnerComponent;

  @ViewChild ( 'page', {
    read: ViewContainerRef
  } )
  viewContainerRef: ViewContainerRef;

  currentPage: WizardPage<any>;
  isLoading: boolean     = true;
  isSidebarOpen: boolean = true;
  wizard: AbstractWizard<any>;
  wizardForm: FormGroup  = new FormGroup ( {} );
  WizardWidth            = WizardWidth;

  private isLiveUpdating: boolean = false; // Is this wizard configured to rerun Codex on form change?
  private wizardFormSubscription: Subscription;

  constructor ( private codexService: CodexService,
                @Inject ( MAT_DIALOG_DATA ) private data: any,
                private dialogRef: MatDialogRef<any>,
                private factoryResolver: ComponentFactoryResolver,
                private logger: Logger,
                private sanitizer: DomSanitizer,
                private store: Store<AppState>,
                private toastFactory: ToastFactory ) {
    super ();
    this.wizard = data;
  }

  ngOnInit () {
    this.initWizard ()
      .subscribe (
        () => {
          this.addSubscription (
            this.initPage ()
              .pipe ( map ( () => this.watchSidebarHeight () ) )
              .subscribe ()
          );
        },
        ( error ) => this.handleInitFailure ( error )
      );
  }

  action(): void {
    if (this.currentPage.isActionable) {
      this.currentPage.isFailed = false;
      this.nextSpinner.start();
      this.addSubscription(
        this.currentPage.onAction()
          .pipe(
            map((nextPageKey: string) => {
              this.wizard.recordNavigation(this.currentPage.key, nextPageKey);
              return nextPageKey;
            }),
            flatMap((nextPageKey: string) => this.loadPage(nextPageKey)),
            finalize(() => this.nextSpinner.stop())
          )
          .subscribe({
            error: (error) => {
              this.currentPage.isFailed = true;
            }
          })
      );
    }
  }

  back (): void {
    if ( this.currentPage.isBackable ) {
      // Find the previous page to go to, if any
      let previousPageKey = this.wizard.getPreviousPageKey ();
      if ( previousPageKey ) {
        this.backSpinner.start ();
        this.addSubscription (
          this.currentPage.onBack ()
            .pipe (
              flatMap ( () => this.loadPage ( previousPageKey, true ) ),
              finalize ( () => this.backSpinner.stop () )
            )
            .subscribe ()
        );
      } else {
        this.logger.error ( 'No WizardPage to navigate Back to!' );
      }
    }
  }

  close(forceClose: boolean = false): Observable<any> {
    let subject = new Subject ();

    if (forceClose || this.currentPage.isCloseable) {
      this.closeSpinner.start ();

      this.addSubscription (
        this.closeQuietly ()
          .pipe ( finalize ( () => {
            this.closeSpinner.stop ();
            subject.next ( this.wizard );
            subject.complete ();
          } ) )
          .subscribe ()
      );
    } else {
      subject.next ( this.wizard );
      subject.complete ();
    }

    return subject;
  }

  delete (): void {
    this.addSubscription (
      this.currentPage.onDelete ()
        .pipe ( flatMap ( () => this.closeQuietly () ) )
        .subscribe ()
    );
  }

  next (): void {
    if ( this.currentPage.isNextable ) {
      this.currentPage.isFailed = false;
      this.nextSpinner.start ();
      this.addSubscription (
        this.currentPage.onNext ()
          .pipe (
            map ( ( nextPageKey: string ) => {
              this.wizard.recordNavigation ( this.currentPage.key, nextPageKey );
              return nextPageKey;
            } ),
            flatMap ( ( nextPageKey: string ) => this.loadPage ( nextPageKey ) ),
            finalize ( () => this.nextSpinner.stop () )
          )
          .subscribe ( {
            error: ( error ) => {
              this.currentPage.isFailed = true;
            }
          } )
      );
    }
  }

  private buildPageComponent ( pageKey: string ): ComponentRef<WizardPage<any>> {
    // Build the new page view
    let componentType                = this.wizard.pageMappings.get ( pageKey );
    let pageComponentRef             = this.factoryResolver.resolveComponentFactory ( componentType )
      .create ( this.viewContainerRef.injector );
    pageComponentRef.instance.wizard = this.wizard;
    pageComponentRef.instance.ngOnInit ();
    pageComponentRef.instance.isInitialized    = true;
    pageComponentRef.instance.close            = (forceClose: boolean = false): Observable<any> => {
      return this.close(forceClose);
    };
    pageComponentRef.instance.runAndApplyCodex = (): Observable<any> => {
      return this.runAndApplyCodex ();
    };

    // Ensure that ngOnInit() doesn't get called again (or at least doesn't have any effect)
    pageComponentRef.instance.ngOnInit = () => {
    };

    return pageComponentRef;
  }

  /**
   * Close the dialog without triggering the spinner. Use this as a side-effect of next() returning null, etc, where
   * another button was clicked to trigger the close. This is to avoid having all the buttons on the bottom of the
   * dialog start spinning...
   */
  private closeQuietly (): Observable<any> {
    return this.currentPage.onClose ()
      .pipe ( finalize ( () => this.dialogRef.close ( this.wizard ) ) );
  }

  private displayPageComponent ( pageKey: string ): ComponentRef<WizardPage<any>> {
    let componentRef           = this.wizard.pages.get ( pageKey );
    this.wizard.currentPageKey = pageKey;
    this.currentPage           = componentRef.instance;
    this.currentPage.isVisited = true;
    return componentRef;
  }

  private enforceSidebarHeight (): void {
    let sidebarContainer: JQuery = $ ( '.sidebar-container' );
    let actionsContainer: JQuery = $ ( '.actions-container' );
    let contentContainer: JQuery = $ ( '.content-container' );

    let maxHeight = 50 + actionsContainer.outerHeight () + contentContainer.height ();
    sidebarContainer.css ( 'max-height', `${maxHeight}px` );
  }

  private handleInitFailure ( error ): void {
    this.toastFactory.error ( 'An unexpected error occurred while trying to start the Wizard.', null, ToastDuration.MEDIUM );
    this.logger.error ( error );
    this.dialogRef.close ( null );
  }

  private initPage (): Observable<any> {
    this.wizard.isInitialized = false;

    let page = this.wizard.currentPageKey ? this.wizard.currentPageKey : this.wizard.startingPageKey;
    return this.loadPage ( page, true )
      .pipe ( map ( () => {
        this.wizard.isInitialized = true;
      } ) );
  }

  private initPlaceholders (): void {
    let authenticationState: AuthenticationState = snapshot ( this.store, AppStateType.AUTHENTICATION_STATE );
    let sessionState: SessionState               = snapshot ( this.store, AppStateType.SESSION_STATE );
    this.wizard.buildPlaceholders ( authenticationState.user, sessionState.selection );
  }

  private initWizard (): Observable<any> {
    this.wizard.initPages ( this.wizard.pageMappings );
    if ( !this.wizard.pageMappings.size ) {
      this.logger.warn ( 'No page mappings found after calling initPages()! Did you forget to add your page component mappings to initPages()?' );
      return throwError ( 'Failed to initialize pages' );
    }

    this.wizard.pageMappings.forEach ( ( value, key: string ) => {
      let componentRef = this.buildPageComponent ( key );
      this.wizard.pages.set ( key, componentRef );
    } );

    if ( !this.currentPage ) {
      if ( this.wizard.currentPageKey ) {
        this.currentPage = this.wizard.pages.get ( this.wizard.currentPageKey ).instance;
      } else if ( this.wizard.startingPageKey ) {
        this.currentPage = this.wizard.pages.get ( this.wizard.startingPageKey ).instance;
      }
    }

    let observables: Observable<any>[] = [];

    observables.push ( this.wizard.preProcess () );

    return forkJoin ( observables );
  }

  private loadPage ( pageKey: string, skipCodexUpdate: boolean = false ): Observable<any> {
    // If pageKey is falsy, close the dialog
    if ( !pageKey ) {
      return this.closeQuietly ();
    }

    this.isLoading = true;
    this.viewContainerRef.detach ();

    let componentRef = this.displayPageComponent ( pageKey );
    componentRef.instance.wizardComponent = this;
    return componentRef.instance.onLoad ()
      .pipe (
        catchError ( ( err, caught ) => {
          console.error(err);
          this.toastFactory.error ( 'The wizard failed to start. Please try again.' );
          return this.closeQuietly ();
        } ),
        finalize ( () => {
          this.initPlaceholders ();
          this.runAndApplyCodex ().subscribe ();
          this.resetFormChangeSubscription ();
          this.isLoading = false;
          this.viewContainerRef.insert ( componentRef.hostView );
        } )
      );
  }

  private resetFormChangeSubscription (): void {
    // Kill any existing form change subscription
    if ( this.wizardFormSubscription ) {
      this.wizardFormSubscription.unsubscribe ();
      this.wizardFormSubscription = null;
    }

    this.wizardForm = this.currentPage.wizardForm;

    if ( this.isLiveUpdating ) {
      this.wizardFormSubscription = this.addSubscription (
        this.wizardForm.valueChanges
          .pipe ( debounceTime ( 300 ) )
          .subscribe ( ( formValue ) => {
            this.runAndApplyCodex ()
              .subscribe ();
          } )
      );
    }
  }

  private runAndApplyCodex (): Observable<any> {
    let request   = this.wizard.buildCodexRequest ( this.currentPage.wizardForm.value );
    let codexName = `cca-wizard-${this.wizard.key}`;

    return this.codexService.runOne ( codexName, request )
      .pipe ( map ( ( response: any ) => {
        this.isLiveUpdating = !!response[ CodexFieldName.UPDATE_ON_FORM_CHANGE ];
        this.wizard.pages.forEach ( ( pageComponentRef: ComponentRef<WizardPage<any>>, key: string ) => {
          pageComponentRef.instance.applyCodexResponse ( response, this.wizard.placeholderDictionary, this.sanitizer );
        } );
      } ) );
  }

  private watchSidebarHeight (): void {
    this.enforceSidebarHeight ();
    this.addSubscription (
      interval ( 50 ).subscribe ( () => this.enforceSidebarHeight () )
    );
  }
}
