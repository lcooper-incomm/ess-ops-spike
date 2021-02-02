import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { Customer } from 'src/app/core/customer/customer';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CsCoreAddressType, CsCoreAddress } from '@cscore/core-client-model';
import { Card } from 'src/app/core/card/card';
import { FsapiStatusType } from 'src/app/core/status/fsapi-status/fsapi-status-type.enum';
import { RegisterVmsCardWizard } from '../../../core/action/vms-actions/register-vms-card-wizard/register-vms-card-wizard';
import { WizardRunner } from 'src/app/core/wizard/wizard-runner/wizard-runner.service';
import { DateService } from 'src/app/core/date/date.service';
import { Partner } from 'src/app/core/session/selection/partner';
import { PlatformType } from 'src/app/core/platform/platform-type.enum';

@Component ( {
  selector: 'cca-kyc-results-table',
  templateUrl: './kyc-results-table.component.html',
  styleUrls: [ './kyc-results-table.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class KycResultsTableComponent implements OnChanges, OnInit {
  @Input () data: Customer[];
  @Input () filter: string;
  @Input () hasVmsSession: boolean = false;
  @Input () pageSize: number       = 10;
  @Input () partner: Partner;
  @Input () platform: PlatformType;

  @Output ( 'retry' ) retryOutput = new EventEmitter ();

  @ViewChild ( MatPaginator ) paginator: MatPaginator;
  @ViewChild ( MatSort ) sort: MatSort;

  dataSource: MatTableDataSource<Customer> = new MatTableDataSource ();
  displayedColumns: string[]               = [ 'name', 'address', 'dateOfBirth', 'ssn', 'starterCard', 'kycStatus', 'reason', 'retry' ];

  constructor (
    private dateService: DateService,
    private wizardRunner: WizardRunner,
  ) {
  }

  ngOnChanges ( changes: SimpleChanges ): void {
    if ( ('data' in changes || 'filter' in changes) && this.data ) {
      this.dataSource.data = this.filterResults ( this.data );
    }
  }

  ngOnInit (): void {
    this.dataSource.paginator           = this.paginator;
    this.dataSource.sort                = this.sort;
    this.dataSource.sortingDataAccessor = ( item: Customer, property: string ) => {
      switch ( property ) {
        case 'name':
          return item.firstName;
        case 'address':
          const address = item.getAddressByType ( CsCoreAddressType.PHYSICAL );
          return address && address.line1;
        case 'dateOfBirth':
          return item.dateOfBirth;
        case 'ssn':
          return item.identification && item.identification.number;
        case 'starterCard':
          const card = this.getCard ( item );
          return card && card.identifiers.pan;
        case 'kycStatus':
          return item.kyc && item.kyc.status;
        case 'reason':
          return item.kyc && item.kyc.code;
        default:
          return item[ property ];
      }
    }
  }

  formatDate ( date: string ): string {
    return this.dateService.convertYYYYMMDDToMMDDYYYY ( date );
  }

  getAddress ( result: Customer ): CsCoreAddress {
    return result.getAddressByType ( CsCoreAddressType.PHYSICAL );
  }

  getCard ( result: Customer ): Card {
    return result.getCardByStatus ( FsapiStatusType.INACTIVE );
  }

  retry ( result: Customer ) {
    const wizard               = new RegisterVmsCardWizard ();
    wizard.model.card          = this.getCard ( result );
    wizard.model.createSession = !this.hasVmsSession;
    wizard.model.customer      = result;
    wizard.model.initialData   = result;
    wizard.model.isKycFailure  = true;
    wizard.model.partner       = this.partner;
    wizard.model.platform      = this.platform;
    this.wizardRunner.run ( wizard );
    this.retryOutput.emit ();
  }

  private filterResults ( results: Customer[] ): Customer[] {
    if ( this.filter ) {
      const filter = this.filter.toLowerCase ();
      return results.filter ( customer => {
        const fieldsToSearch = [ 'name', 'address', 'dateOfBirth', 'ssn', 'starterCard', 'kycStatus', 'reason' ];
        return fieldsToSearch.some ( field => {
          const value = this.dataSource.sortingDataAccessor ( customer, field );
          return value && value.toString ().toLowerCase ().includes ( filter );
        } );
      } );
    }
    return results;
  }
}
