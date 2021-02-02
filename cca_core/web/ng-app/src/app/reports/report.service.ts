import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as _ from 'lodash';
import {SecurityService} from '../core/security/security.service';
import {Report} from './report';
import {Logger} from '../logging/logger.service';
import {RoutingService} from '../core/routing/routing.service';

const build = map(value => new Report(value));

const buildAll = map((values: any[]) => {
  let results: Report[] = [];
  values.forEach(value => results.push(new Report(value)));
  return results;
});

@Injectable({
  providedIn: 'root'
})

export class ReportService {

  constructor(private http: HttpClient,
              private logger: Logger,
              private routingService: RoutingService,
              private securityService: SecurityService) {
  }

  findAll(): Observable<Report[]> {
    return this.http.get('/rest/report')
      .pipe(buildAll);
  }

  findAllForCurrentUser(): Observable<Report[]> {
    return this.findAll()
      .pipe(map((reports: Report[]) => {
        return _.filter(reports, (report: Report) => {
          return this.securityService.hasPermission(report.permission.systemName);
        });
      }));
  }

  create(report: Report): Observable<any> {
    return this.http.post(`/rest/report`, report)
      .pipe(build);
  }

  updateOne(report: Report): Observable<any> {
    return this.http.put(`/rest/report/${report.id}`, report)
      .pipe(build);
  }

  public openReportInNewTab(report: Report) {
    if (report) {
      window.open(report.link, report.name, '');
    }
  }

  public splitIntoColumns(obj, cols) {
    return _.chunk(obj, Math.ceil((obj.length / cols)));
  }
}
