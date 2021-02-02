import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ShortPay} from './short-pay';

const build = map((value: any) => new ShortPay(value));

const buildAll = map((values: any[]) => values.map(value => new ShortPay(value)));

@Injectable({
  providedIn: 'root'
})
export class ShortPayService {

  private static readonly FIND_ALL_PATH: string = '/rest/shortPay';

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<ShortPay[]> {
    return this.httpClient.get<ShortPay[]>(ShortPayService.FIND_ALL_PATH).pipe(buildAll);
  }

  findByLegacyMerchantId(merchantLegacyId: string): Observable<ShortPay | null> {
    const find = map((shortPays: ShortPay[]) => shortPays.find(shortPay => shortPay.merchantId === merchantLegacyId) || null);
    return this.findAll().pipe(find);
  }

  findByLocationId(locationId: string): Observable<ShortPay[]> {
    return this.httpClient.get<ShortPay[]>(`/rest/terminal/shortPayLocation/${locationId}`)
      .pipe(buildAll);
  }

  create(shortPay: ShortPay): Observable<ShortPay> {
    return this.httpClient.post<ShortPay>('/rest/shortPay', shortPay)
      .pipe(build);
  }

  delete(shortPay: ShortPay): Observable<any> {
    return this.httpClient.delete(`/rest/shortPay/${shortPay.id}`);
  }
}
