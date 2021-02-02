import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Dictionary} from './dictionary';
import {Logger} from '../../logging/logger.service';

@Injectable()
export class DictionaryService {

  dictionariesMap: Map<string, Dictionary[]> = new Map<string, Dictionary[]>();

  constructor(private http: HttpClient,
              private logger: Logger) {
  }

  clear(): void {
    this.logger.debug('Clearing dictionary cache.');
    this.dictionariesMap.clear();
  }

  /**
   * Find all dictionary entries based on the dictionary class name.
   *
   * @param dictionary
   * @param forceRefresh
   */
  findAll(dictionary: string, forceRefresh: boolean = false): Observable<Dictionary[]> {
    if (this.dictionariesMap.has(dictionary) && !forceRefresh) {
      return of(this.dictionariesMap.get(dictionary));
    } else {
      return this.http.get<Dictionary[]>(`/rest/dictionary/${dictionary}`)
        .pipe(
          tap((response: Dictionary[]) => {
            this.dictionariesMap.set(dictionary, response);
          })
        );
    }
  }

  /**
   * Find a dictionary given the dictionary class name and id.
   *
   * @param dictionary
   * @param id
   * @param forceRefresh
   */
  find(dictionary: string, id: number, forceRefresh: boolean = false): Observable<Dictionary> {
    return this.findAll(dictionary, forceRefresh)
      .pipe(
        map((dictionaries: Dictionary[]) => {
          return dictionaries.find((dictionary: Dictionary) => dictionary.value === id);
        })
      );
  }
}
