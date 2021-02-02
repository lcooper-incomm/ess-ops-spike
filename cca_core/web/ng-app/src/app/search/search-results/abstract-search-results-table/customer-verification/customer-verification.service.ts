import {Injectable} from '@angular/core';
import {SearchResultType} from 'src/app/core/search/search.service';
import {SearchTypeContainer} from 'src/app/core/search/search-type-container';
import {WizardRunner} from 'src/app/core/wizard/wizard-runner/wizard-runner.service';
import {Observable, of} from 'rxjs';
import {VerifyCustomerWizard} from '../verify-customer/verify-customer-wizard';
import {Card} from '../../../../core/card/card';
import {MaplesAccount, MaplesCustomer, MaplesOrder} from '@cscore/maples-client-model';
import {AuthenticateCustomerWizard} from '../authenticate-customer/authenticate-customer-wizard';
import {map, tap} from 'rxjs/operators';
import {SearchTypeType} from '../../../../core/search/search-type/search-type-type.enum';
import {VerifiedField} from "../authenticate-customer/verified-fields";
import {TransitionService} from '../../../../core/transition/transition.service';
import {Logger} from '../../../../logging/logger.service';

@Injectable ( {
  providedIn: 'root'
} )
export class CustomerVerificationService {

  constructor ( private wizardRunner: WizardRunner,
                private transitionService: TransitionService,
                private logger: Logger) {
  }

  /**
   * Verifies the customer (caller) for a search result
   *
   * If the verification dialog is required, this will emit true/false when the wizard closes
   * If the verification dialog is not required, this will simply emit true
   *
   * @param result
   * @param searchTypeContainer
   */
  verifyCustomerForSearchResult ( result: SearchResultType, searchTypeContainer: SearchTypeContainer ): Observable<boolean> {
    this.logger.debug('CustomerVerificationService: verifyCustomerForSearchResult');

    if ( this.isVerificationDialogRequired ( searchTypeContainer ) ) {
      return this.runCustomerVerificationWizard( result, searchTypeContainer );
    } else {
      return of ( true );
    }
  }

  runCustomerVerificationWizard( result: SearchResultType, searchTypeContainer: SearchTypeContainer ): Observable<boolean> {
    this.logger.debug('CustomerVerificationService: runCustomerVerificationWizard');
    this.transitionService.off();

    const wizard = this.buildVerificationWizard ( result, searchTypeContainer);
    return this.wizardRunner.run ( wizard )
      .afterClosed ()
      .pipe (
        tap ( wizardResult => {
          if (wizardResult.model.isVerified) {
            this.transitionService.on();
          }
        } ),
        map ( wizardResult => wizardResult.model.isVerified )
      );
  }

  buildVerificationWizard ( result: SearchResultType, searchTypeContainer: SearchTypeContainer | null): AuthenticateCustomerWizard | VerifyCustomerWizard {
    if ( result instanceof MaplesAccount ) {
      const wizard         = new AuthenticateCustomerWizard ();
      wizard.model.account = result;
      wizard.model.verification = searchTypeContainer.parameters.get('verification');
      return wizard;
    } else {
      const wizard = new VerifyCustomerWizard ();
      if ( result instanceof Card ) {
        wizard.model.card     = result;
        wizard.model.customer = result.customer;
      } else if ( result instanceof MaplesOrder ) {
        wizard.model.order = result;
      } else if ( result instanceof MaplesCustomer ) {
        wizard.model.maplesCustomer = result;
      }
      return wizard;
    }
  }

  isVerificationDialogRequired ( searchTypeContainer: SearchTypeContainer ): boolean {
    // Will not show dialogue in SERVE if all three isSomethingVerified fields are true
    if (searchTypeContainer.searchType.type === SearchTypeType.SERVE) {
      let verification: VerifiedField = searchTypeContainer.parameters.get('verification');
      if (verification && verification.isLastFourSsnVerified && verification.isDateOfBirthVerified && verification.isCardVerified) {
        return false;
      }
    }

    return [
      SearchTypeType.ECOMM_ORDER,
      SearchTypeType.ENCOR,
      SearchTypeType.SERVE,
      SearchTypeType.VMS_GPR,
      SearchTypeType.VMS_GIFT,
    ].includes ( searchTypeContainer.searchType.type );
  }
}
