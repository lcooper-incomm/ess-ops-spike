import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { flatMap, map, tap, mapTo } from 'rxjs/operators';
import { Location } from "./location";
import { Observable, of } from "rxjs";
import { HierarchyService } from "../hierarchy/hierarchy.service";
import { NodeType } from "../node-type.enum";
import { Logger } from "../../../logging/logger.service";
import { Hierarchy } from "../hierarchy/hierarchy";
import { Selection } from '../../session/model/selection';
import { SetSelectionHierarchyAction } from '../../session/action/session-actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-state';

const build = map ( value => new Location ( value ) );

const buildAll = map ( ( values: any[] ) => {
  let results: Location[] = [];
  values.forEach ( value => results.push ( new Location ( value ) ) );
  return results;
} );

@Injectable ( {
  providedIn: 'root'
} )
export class LocationService {

  constructor (
    private hierarchyService: HierarchyService,
    private http: HttpClient,
    private logger: Logger,
    private store: Store<AppState>,
  ) {
  }

  findOneById ( id: string ): Observable<Location> {
    return this.http.get ( `/rest/location/${id}` )
      .pipe ( build );
  }

  findPurchaseLocation ( nodeType: NodeType, nodeId: string ): Observable<Location> {
    if ( nodeType && nodeId ) {
      switch ( nodeType ) {
        case NodeType.LOCATION:
        case NodeType.TERMINAL:
          let nodeTypeName = nodeType === NodeType.TERMINAL ? 'TERMINAL' : 'LOCATION';

          /*
          For the time being, we assume that any LOCATION id given to us this way is a legacy ID. Therefore, we have to
          lookup the hierarchy by legacy ID, and then can use the actual ID (non-legacy ID) to do the location lookup.

          I don't remember why... But if it ain't broke, don't fix it.
           */
          let isLegacy = nodeTypeName === 'LOCATION';

          return this.hierarchyService.findOne ( nodeTypeName, nodeId, isLegacy )
            .pipe ( flatMap ( ( hierarchy: Hierarchy ) => {
              if ( hierarchy && hierarchy.location ) {
                return this.findOneById ( hierarchy.location.id );
              } else {
                this.logger.warn ( 'Skipped purchase location lookup due to no Hierarchy found, or Hierarchy did not contain a Location', hierarchy );
                return of ( null );
              }
            } ) );
        default:
          /*
          If the nodeType is NOT a terminal or location, we are trying a location lookup anyway... I can't for the life
          of me remember why we do this. Maybe it never gets called? Something to investigate later.
           */
          return this.findOneById ( nodeId );
      }
    } else {
      this.logger.warn ( 'Skipped purchase location lookup due to missing information' );
      return of ( null );
    }
  }

  loadSecondaryLocationData ( selection: Selection<Location> ): Observable<void> {
    return this.hierarchyService.findOne ( 'location', selection.getLocation ().id )
      .pipe (
        tap ( hierarchy => {
          selection.hierarchy = hierarchy;
          this.store.dispatch ( new SetSelectionHierarchyAction ( selection ) );
        } ),
        mapTo ( null ),
      );
  }
}
