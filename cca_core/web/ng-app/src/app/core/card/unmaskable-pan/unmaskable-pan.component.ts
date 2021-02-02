import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Card } from "../card";
import { SecurityService } from "../../security/security.service";
import { Permission } from "../../auth/permission";
import { SpinnerComponent } from "../../spinner/spinner.component";
import { CardService } from "../card.service";
import { CustomerService } from '../../customer/customer.service';
import { PlatformType } from "../../platform/platform-type.enum";
import { Logger } from "../../../logging/logger.service";
import { finalize } from "rxjs/operators";
import { Customer } from "../../customer/customer";

@Component ( {
  selector: 'cca-unmaskable-pan',
  templateUrl: './unmaskable-pan.component.html',
  styleUrls: [ './unmaskable-pan.component.scss' ]
} )
export class UnmaskablePanComponent implements OnInit, OnChanges {

  @Input ()
  card: Card;
  @Input ()
  customer: Customer;

  hasUnmaskPermission: boolean = false;
  unmaskedPan: string;

  @ViewChild ( SpinnerComponent )
  spinner: SpinnerComponent;

  constructor ( private cardService: CardService,
                private customerService: CustomerService,
                private logger: Logger,
                private securityService: SecurityService ) {
  }

  ngOnChanges ( changes: SimpleChanges ): void {
    if ( changes.card ) {
      this.unmaskedPan = null;
    }
  }

  ngOnInit () {
    this.hasUnmaskPermission = this.securityService.hasPermission ( Permission.UNMASK_PAN );
  }

  unmask (): void {
    this.spinner.start ();

    //SRL flow
    if ( this.card.srlData ) {
      this.cardService.decryptSrlPan ( this.card.srlData.identifiers.serialNumber, this.card.platform, this.card.srlData.identifiers.controlNumber )
        .pipe ( finalize ( () => this.spinner.stop () ) )
        .subscribe ( ( decryptedPan: string ) => {
          this.unmaskedPan = decryptedPan;
        } );
    }
    //Normal flow here
    else {
      switch ( this.card.platform ) {
        case PlatformType.GREENCARD:
        case PlatformType.SRL:
          this.cardService.decryptGreencardPan ( this.card.identifiers.pan )
            .pipe ( finalize ( () => this.spinner.stop () ) )
            .subscribe ( ( decryptedPan: string ) => {
              this.unmaskedPan = decryptedPan;
            } );
          break;
        case PlatformType.VMS:
        case PlatformType.CCL:
          this.cardService.decryptFsapiPan ( this.customer.id, this.card.identifiers.pan )
            .pipe ( finalize ( () => this.spinner.stop () ) )
            .subscribe ( ( decryptedPan: string ) => {
              this.unmaskedPan = decryptedPan;
            } );
          break;
        default:
          this.logger.error ( 'Unsupported PlatformType for Unmaskable PAN', this.card.platform );
          this.spinner.stop ();
          break;
      }
    }
  }

}
