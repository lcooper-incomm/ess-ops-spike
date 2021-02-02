import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

const build = map ( value => new PostalCodeLookupResult ( value ) );

@Injectable ( {
  providedIn: 'root'
} )
export class PostalCodeService {

  constructor ( private http: HttpClient ) {
  }

  lookup ( value: string ): Observable<PostalCodeLookupResult> {
    return this.http.get ( '/rest/third-party/postal-code/' + value )
      .pipe ( build );
  }
}

export class PostalCodeLookupResult {
  city: string;
  country: string;
  postalCode: string;
  state: string;

  constructor ( data: any ) {
    if ( data ) {
      this.country    = data.countryAbbreviation ? data.countryAbbreviation.toUpperCase () : null;
      this.postalCode = data.postCode;

      if ( data.places && data.places.length ) {
        let place  = data.places[ 0 ];
        this.city  = place[ 'place name' ];
        this.state = place[ 'state abbreviation' ];
      }
    }
  }
}
