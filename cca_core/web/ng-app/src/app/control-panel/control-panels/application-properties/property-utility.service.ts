import { Injectable } from '@angular/core';
import { Property } from "../../../core/model/property";
import * as _ from "lodash";
import { PropertyType } from "../../../core/model/property-type.enum";
import { PropertyService } from "../../../core/config/property.service";
import { forkJoin, Observable } from "rxjs";
import { GenericMessageView } from "../../../core/generic-message-view";

@Injectable ( {
  providedIn: 'root'
} )
export class PropertyUtilityService {

  csCoreLoggingLevel: any[] = [
    { value: 'DEBUG' },
    { value: 'INFO' },
    { value: 'WARN' },
    { value: 'ERROR' }
  ];

  csCoreLoggingInformationLevel: any[] = [
    { value: 'NONVERBOSE' },
    { value: 'VERBOSE' }
  ];

  csCoreLoggingMaskingLevel: any[] = [
    { value: 'MASKED' },
    { value: 'UNMASKED' }
  ];

  loggingProperties: Property[] = [
    {
      id: 0,
      displayName: 'CS-Core Logging Level',
      description: 'The level (DEBUG, INFO, WARN, ERROR) at which the CS-Core Logging library will log entries',
      value: null,
      systemName: PropertyType.CS_CORE_LOGGING_LEVEL
    },
    {
      id: 1,
      displayName: 'CS-Core Logging Information Level',
      description: 'The amount of information CS-Core Logging will output in its request/response log entries',
      value: null,
      systemName: PropertyType.CS_CORE_LOGGING_INFORMATION_LEVEL
    },
    {
      id: 2,
      displayName: 'CS-Core Logging Masking Level',
      description: 'Whether CS-Core Logging will mask protected values',
      value: null,
      systemName: PropertyType.CS_CORE_LOGGING_MASKING_LEVEL
    },
  ];

  logLevel: Observable<GenericMessageView>        = this.propertyService.getLoggingLevel ( LoggingLevel.LOGGING_LEVEL );
  logLevelInfo: Observable<GenericMessageView>    = this.propertyService.getLoggingLevel ( LoggingLevel.LOGGING_INFORMATION_LEVEL );
  logLevelMasking: Observable<GenericMessageView> = this.propertyService.getLoggingLevel ( LoggingLevel.LOGGING_MASKING_LEVEL );

  constructor ( private propertyService: PropertyService ) {
  }

  addLoggingProperties ( properties ): Property[] {
    return _.concat ( properties, this.getLoggingProperties () )
  }

  getLoggingOptions ( systemName ) {
    if ( systemName === PropertyType.CS_CORE_LOGGING_LEVEL ) {
      return this.csCoreLoggingLevel;
    } else if ( systemName === PropertyType.CS_CORE_LOGGING_INFORMATION_LEVEL ) {
      return this.csCoreLoggingInformationLevel;
    } else if ( systemName === PropertyType.CS_CORE_LOGGING_MASKING_LEVEL ) {
      return this.csCoreLoggingMaskingLevel;
    }
  }

  getLoggingEndPoint ( systemName ) {
    if ( systemName === PropertyType.CS_CORE_LOGGING_LEVEL ) {
      return LoggingEndPoint.UPDATE_LOGGING_LEVEL;
    } else if ( systemName === PropertyType.CS_CORE_LOGGING_INFORMATION_LEVEL ) {
      return LoggingEndPoint.UPDATE_LOGGING_INFORMATION_LEVEL;
    } else if ( systemName === PropertyType.CS_CORE_LOGGING_MASKING_LEVEL ) {
      return LoggingEndPoint.UPDATE_LOGGING_MASKING_LEVEL;
    }
  }

  private getLoggingProperties () {
    let observables: Observable<GenericMessageView>[] = [
      this.logLevel, this.logLevelInfo, this.logLevelMasking
    ];

    forkJoin ( observables ).subscribe ( results => {
      this.loggingProperties[ 0 ].value = results[ 0 ].message;
      this.loggingProperties[ 1 ].value = results[ 1 ].message;
      this.loggingProperties[ 2 ].value = results[ 2 ].message;
    } );
    return this.loggingProperties;
  }
}

export enum LoggingEndPoint {
  UPDATE_LOGGING_LEVEL             = 'updateLoggingLevel',
  UPDATE_LOGGING_INFORMATION_LEVEL = 'updateLoggingInformationLevel',
  UPDATE_LOGGING_MASKING_LEVEL     = 'updateLoggingMaskingLevel'
}

export enum LoggingLevel {
  LOGGING_LEVEL             = 'logging-level',
  LOGGING_INFORMATION_LEVEL = 'logging-information-level',
  LOGGING_MASKING_LEVEL     = 'logging-masking-level'
}
