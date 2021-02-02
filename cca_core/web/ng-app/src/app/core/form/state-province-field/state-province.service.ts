import {Injectable} from '@angular/core';
import {CountryGroup, StateProvince} from "./state-province-field.component";
import * as _ from "lodash";

const countryGroups: CountryGroup[] = [
  {
    value: 'US',
    displayName: 'United States',
    priority: 1,
    children: [
      { name: 'Alabama', abbreviation: 'AL', country: 'US' },
      { name: 'Alaska', abbreviation: 'AK', country: 'US' },
      { name: 'Arizona', abbreviation: 'AZ', country: 'US' },
      { name: 'Arkansas', abbreviation: 'AR', country: 'US' },
      { name: 'California', abbreviation: 'CA', country: 'US' },
      { name: 'Colorado', abbreviation: 'CO', country: 'US' },
      { name: 'Connecticut', abbreviation: 'CT', country: 'US' },
      { name: 'Delaware', abbreviation: 'DE', country: 'US' },
      { name: 'District of Columbia', abbreviation: 'DC', country: 'US' },
      { name: 'Florida', abbreviation: 'FL', country: 'US' },
      { name: 'Georgia', abbreviation: 'GA', country: 'US' },
      { name: 'Hawaii', abbreviation: 'HI', country: 'US' },
      { name: 'Idaho', abbreviation: 'ID', country: 'US' },
      { name: 'Illinois', abbreviation: 'IL', country: 'US' },
      { name: 'Indiana', abbreviation: 'IN', country: 'US' },
      { name: 'Iowa', abbreviation: 'IA', country: 'US' },
      { name: 'Kansas', abbreviation: 'KS', country: 'US' },
      { name: 'Kentucky', abbreviation: 'KY', country: 'US' },
      { name: 'Louisiana', abbreviation: 'LA', country: 'US' },
      { name: 'Maine', abbreviation: 'ME', country: 'US' },
      { name: 'Maryland', abbreviation: 'MD', country: 'US' },
      { name: 'Massachusetts', abbreviation: 'MA', country: 'US' },
      { name: 'Michigan', abbreviation: 'MI', country: 'US' },
      { name: 'Minnesota', abbreviation: 'MN', country: 'US' },
      { name: 'Mississippi', abbreviation: 'MS', country: 'US' },
      { name: 'Missouri', abbreviation: 'MO', country: 'US' },
      { name: 'Montana', abbreviation: 'MT', country: 'US' },
      { name: 'Nebraska', abbreviation: 'NE', country: 'US' },
      { name: 'Nevada', abbreviation: 'NV', country: 'US' },
      { name: 'New Hampshire', abbreviation: 'NH', country: 'US' },
      { name: 'New Jersey', abbreviation: 'NJ', country: 'US' },
      { name: 'New Mexico', abbreviation: 'NM', country: 'US' },
      { name: 'New York', abbreviation: 'NY', country: 'US' },
      { name: 'North Carolina', abbreviation: 'NC', country: 'US' },
      { name: 'North Dakota', abbreviation: 'ND', country: 'US' },
      { name: 'Ohio', abbreviation: 'OH', country: 'US' },
      { name: 'Oklahoma', abbreviation: 'OK', country: 'US' },
      { name: 'Oregon', abbreviation: 'OR', country: 'US' },
      { name: 'Pennsylvania', abbreviation: 'PA', country: 'US' },
      { name: 'Puerto Rico', abbreviation: 'PR', country: 'US' },
      { name: 'Rhode Island', abbreviation: 'RI', country: 'US' },
      { name: 'South Carolina', abbreviation: 'SC', country: 'US' },
      { name: 'South Dakota', abbreviation: 'SD', country: 'US' },
      { name: 'Tennessee', abbreviation: 'TN', country: 'US' },
      { name: 'Texas', abbreviation: 'TX', country: 'US' },
      { name: 'Utah', abbreviation: 'UT', country: 'US' },
      { name: 'Vermont', abbreviation: 'VT', country: 'US' },
      { name: 'Virginia', abbreviation: 'VA', country: 'US' },
      { name: 'Washington', abbreviation: 'WA', country: 'US' },
      { name: 'West Virginia', abbreviation: 'WV', country: 'US' },
      { name: 'Wisconsin', abbreviation: 'WI', country: 'US' },
      { name: 'Wyoming', abbreviation: 'WY', country: 'US' }
    ]
  },
  {
    value: 'CA',
    displayName: 'Canada',
    priority: 2,
    children: [
      { name: 'Alberta', abbreviation: 'AB', country: 'CA' },
      { name: 'British Columbia', abbreviation: 'BC', country: 'CA' },
      { name: 'Manitoba', abbreviation: 'MB', country: 'CA' },
      { name: 'New Brunswick', abbreviation: 'NB', country: 'CA' },
      { name: 'Newfoundland and Labrador', abbreviation: 'NL', country: 'CA' },
      { name: 'Nova Scotia', abbreviation: 'NS', country: 'CA' },
      { name: 'Northwest Territories', abbreviation: 'NT', country: 'CA' },
      { name: 'Nunavut', abbreviation: 'NU', country: 'CA' },
      { name: 'Ontario', abbreviation: 'ON', country: 'CA' },
      { name: 'Prince Edward Island', abbreviation: 'PE', country: 'CA' },
      { name: 'Quebec', abbreviation: 'QC', country: 'CA' },
      { name: 'Saskatchewan', abbreviation: 'SK', country: 'CA' },
      { name: 'Yukon', abbreviation: 'YT', country: 'CA' }
    ]
  },
  {
    value: 'CO',
    displayName: 'Colombia',
    priority: 3,
    children: [
      {name: 'Capital District', abbreviation: 'DC*', country: 'CO'},
      {name: 'Amazonas', abbreviation: 'AMA', country: 'CO'},
      {name: 'Antioquia', abbreviation: 'ANT', country: 'CO'},
      {name: 'Arauca', abbreviation: 'ARA', country: 'CO'},
      {name: 'Atlántico', abbreviation: 'ATL', country: 'CO'},
      {name: 'Bolívar', abbreviation: 'BOL', country: 'CO'},
      {name: 'Boyacá', abbreviation: 'BOY', country: 'CO'},
      {name: 'Caldas', abbreviation: 'CAL', country: 'CO'},
      {name: 'Caquetá', abbreviation: 'CAQ', country: 'CO'},
      {name: 'Casanare', abbreviation: 'CAS', country: 'CO'},
      {name: 'Cauca', abbreviation: 'CAU', country: 'CO'},
      {name: 'Cesar', abbreviation: 'CES', country: 'CO'},
      {name: 'Chocó', abbreviation: 'CHO', country: 'CO'},
      {name: 'Córdoba', abbreviation: 'COR', country: 'CO'},
      {name: 'Cundinamarca', abbreviation: 'CUN', country: 'CO'},
      {name: 'Guainía', abbreviation: 'GUA', country: 'CO'},
      {name: 'Guaviare', abbreviation: 'GUV', country: 'CO'},
      {name: 'Huila', abbreviation: 'HUI', country: 'CO'},
      {name: 'La Guajira', abbreviation: 'LAG', country: 'CO'},
      {name: 'Magdalena', abbreviation: 'MAG', country: 'CO'},
      {name: 'Meta', abbreviation: 'MET', country: 'CO'},
      {name: 'Nariño', abbreviation: 'NAR', country: 'CO'},
      {name: 'Norte de Santander', abbreviation: 'NSA', country: 'CO'},
      {name: 'Putumayo', abbreviation: 'PUT', country: 'CO'},
      {name: 'Quindío', abbreviation: 'QUI', country: 'CO'},
      {name: 'Risaralda', abbreviation: 'RIS', country: 'CO'},
      {name: 'San Andrés y Providencia', abbreviation: 'SAP', country: 'CO'},
      {name: 'Santander', abbreviation: 'SAN', country: 'CO'},
      {name: 'Sucre', abbreviation: 'SUC', country: 'CO'},
      {name: 'Tolima', abbreviation: 'TOL', country: 'CO'},
      {name: 'Valle del Cauca', abbreviation: 'VAC', country: 'CO'},
      {name: 'Vaupés', abbreviation: 'VAU', country: 'CO'},
      {name: 'Vichada', abbreviation: 'VID', country: 'CO'}
    ]
  }
];

@Injectable ( {
  providedIn: 'root'
} )
export class StateProvinceService {

  private countryGroupsByState = new Map<string, CountryGroup> ();

  constructor () {
    countryGroups.forEach ( countryGroup => {
      countryGroup.children.forEach ( state => {
        this.countryGroupsByState.set ( state.abbreviation, countryGroup );
      } )
    } );
  }

  getCountryGroups (): CountryGroup[] {
    return countryGroups;
  }

  getCountryGroupForState ( abbreviation: string ): CountryGroup {
    return this.countryGroupsByState.get ( abbreviation );
  }

  getDisplayValue ( abbreviation: string, country: string ): string {
    let displayValue: string;

    let group: CountryGroup = _.find ( this.getCountryGroups (), ( group: CountryGroup ) => {
      return group.value === country;
    } );

    if ( group ) {
      let stateProvince: StateProvince = _.find ( group.children, ( stateProvince: StateProvince ) => {
        return stateProvince.abbreviation === abbreviation;
      } );
      if ( stateProvince ) {
        displayValue = `${stateProvince.name} (${stateProvince.abbreviation})`;
      }
    }

    return displayValue;
  }

  getStateProvinceByAbbreviation ( abbreviation: string ): StateProvince {
    let result: StateProvince = null;

    this.getCountryGroups ().forEach ( group => {
      if ( !result ) {
        result = _.find ( group.children, ( state: StateProvince ) => {
          return state.abbreviation === abbreviation;
        } );
      }
    } );

    return result;
  }
}
