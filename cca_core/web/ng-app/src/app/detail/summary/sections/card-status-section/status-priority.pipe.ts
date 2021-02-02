import { Pipe, PipeTransform } from '@angular/core';
import { CsCoreStatus, CsCoreStatusType } from "../../../../core/model/cs-core-status";
import * as _ from "lodash";
import { PlatformType } from "../../../../core/platform/platform-type.enum";

@Pipe ( {
  name: 'statusPriority'
} )
export class StatusPriorityPipe implements PipeTransform {

  transform ( statuses: CsCoreStatus[] ): any {
    if ( statuses ) {
      //We only want to show the platform statuses here, not shipping or any other type
      const filteredStatuses = statuses.filter ( ( status: CsCoreStatus ) => {
        return status.type === CsCoreStatusType.PLATFORM;
      } );
      return _.orderBy ( filteredStatuses, ( status: CsCoreStatus ) => {
        switch ( status.platform ) {
          case PlatformType.GREENCARD:
          case PlatformType.VIRGIN:
          case PlatformType.BOOST:
          case PlatformType.TRACFONE:
          case PlatformType.NET10:
          case PlatformType.DDP:
            return 1;
          case PlatformType.INCOMM:
          case PlatformType.SEJ:
          case PlatformType.MDM:
            return 2;
          case PlatformType.EPS:
            return 3;
          case PlatformType.PRE:
            return 4;
          default:
            return 100;
        }
      } )
    }
    return statuses;
  }

}
