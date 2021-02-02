import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {MaplesResultMessageResponse, MaplesIdentification, MaplesIdentificationType} from '@cscore/maples-client-model';
import {ActionToolbarButtonStatus} from "../../../../core/action-toolbar/action-toolbar-button-status";
import {CsCorePopoverComponent} from "@cscore/components";
import {CcaBaseComponent} from "../../../../core/cca-base-component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {finalize} from "rxjs/operators";
import {CustomerAccountService} from "../../../../core/customer-account/customer-account.service";
import {ToastFactory} from "../../../../toast/toast-factory.service";
import {AppStateType} from "../../../../app-state-type.enum";
import {SessionState} from "../../../../core/session/session-state";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../app-state";
import {Selection} from "../../../../core/session/model/selection";
import {SpinnerComponent} from "../../../../core/spinner/spinner.component";
import {DateService} from "../../../../core/date/date.service";


@Component ( {
  selector: 'cca-serve-identification-information',
  templateUrl: './serve-identification-information.component.html',
  styleUrls: [ './serve-identification-information.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class ServeIdentificationInformationComponent extends CcaBaseComponent implements OnInit {
  actions: ActionToolbarButtonStatus[] = [];
  buildingActions: boolean             = false;
  driversLicense: MaplesIdentification;
  form: FormGroup                      = new FormGroup({});
  selection: Selection<any>;
  ssn: MaplesIdentification;

  @ViewChild('ssnSpinner')
  ssnSpinner: SpinnerComponent;

  constructor(private accountService: CustomerAccountService,
              private dateService: DateService,
              private store: Store<AppState>,
              private toastFactory: ToastFactory) {
    super();
  }

  ngOnInit() {
    this.subscribeToSessionState();
    this.initForm();
    this.setIdentification();
  }

  setIdentification() {

    if (this.selection.getCustomerAccount().customer.identification) {
      this.driversLicense = this.selection.getCustomerAccount().customer.identification.find(item => item.type === MaplesIdentificationType.DRIVERS_LICENSE);
      this.ssn            = this.selection.getCustomerAccount().customer.identification.find(item => item.type === MaplesIdentificationType.SSN);
    }
  }

  updateSsn(popover: CsCorePopoverComponent) {
    let request = this.buildRequest();
    this.ssnSpinner.start();
    this.accountService.updateSsn(this.selection.getCustomerAccount().customer.id, request, this.selection.platform)
      .pipe(finalize(() => this.ssnSpinner.stop()))
      .subscribe((response: MaplesResultMessageResponse) => {
        this.ssnSpinner.stop();
        this.closePopover(popover);
        this.updateWithNewSsn(request);
        this.toastFactory.success('SSN updated successfully');
      });
  }

  buildRequest(): UpdateSsnRequest {
    let request         = new UpdateSsnRequest();
    request.dateOfBirth = this.dateService.convertMMDDYYYYToYYYYMMDD(this.selection.getCustomerAccount().customer.dateOfBirth);
    request.ssn         = this.form.get('ssn').value;
    request.firstName   = this.selection.getCustomerAccount().customer.firstName;
    request.lastName    = this.selection.getCustomerAccount().customer.lastName;

    return request
  }

  openEditSsnPopover(popover: CsCorePopoverComponent) {
    popover.open()
  }

  closePopover(popover: CsCorePopoverComponent) {
    popover.close();
  }

  updateWithNewSsn(request) {
    this.ssn.value = request.ssn.slice(request.ssn.length - 4)
  }

  private initForm(): void {
    this.form = new FormGroup({
      ssn: new FormControl([], [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
    });
  }

  private subscribeToSessionState(): void {
    this.addSubscription(
      this.store.select(AppStateType.SESSION_STATE)
        .subscribe((state: SessionState) => {
          if (state && state.selection) {
            this.selection = state.selection;
            //TODO add actions
          }
        })
    );
  }
}

export class UpdateSsnRequest {
  ssn: string;
  dateOfBirth: string;
  firstName: string;
  lastName: string;

  constructor(data: any = null) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
