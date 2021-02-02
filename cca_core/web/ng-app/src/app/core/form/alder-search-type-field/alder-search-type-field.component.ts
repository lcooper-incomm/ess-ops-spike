import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {CcaBaseComponent} from "../../cca-base-component";
import {SecurityService} from "../../security/security.service";
import {Permission} from "../../auth/permission";
import {GenericOption} from "../../model/generic-option";
import {AlderSearchType} from "../../order/alder-search-type.enum";

@Component({
  selector: 'cca-alder-search-type-field',
  templateUrl: './alder-search-type-field.component.html',
  styleUrls: ['./alder-search-type-field.component.scss']
})
export class AlderSearchTypeFieldComponent extends CcaBaseComponent implements OnInit  {
  @Input ()
  form: FormGroup;
  @Input ()
  controlName: string = 'alderSearchType';
  @Input ()
  placeholder: string = 'Search Type';

  searchOptions: GenericOption<AlderSearchType>[] = [];


  constructor(private securityService: SecurityService ) {
    super();
  }

  ngOnInit() {
    this.buildOptions ();
  }

  private buildOptions (): void {
    if ( this.securityService.hasPermission ( Permission.SEARCH_BY_ALDER_ORDER ) ) {
      this.searchOptions.push ({
        displayValue: 'Order',
        value: AlderSearchType.ORDER
      } );
    }
    if ( this.securityService.hasPermission ( Permission.SEARCH_BY_ALDER_CARD ) ) {
      this.searchOptions.push ({
        displayValue: 'Card',
        value: AlderSearchType.CARD
      } );
    }
  }

}
