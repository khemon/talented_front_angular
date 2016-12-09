/**
 * Created by Khémon on 07/12/2016.
 */
import {Injectable, Inject} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {JobType} from '../model/job-type';
import {Observable} from 'rxjs/Observable';
import {AppConfig, APP_CONFIG} from '../app-config';
import 'rxjs/Rx';

@Injectable()
export class JobTypeService {
  private apiEndPoint = 'jobType'
  private apiUrl;
  private mockDataUrl;

  constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: Http) {
    // Base URL for Talented API
    this.apiUrl = config.apiUrl;
    this.mockDataUrl = config.mockDataUrl;
  }

  /**
   * Retourne la liste des types de jobs de la BDD
   */
  getJobTypes(): Observable<JobType[]>{
    //var url = this.apiUrl + this.apiEndPoint;
    //TODO: remove this url once backend is ready
    var url = this.mockDataUrl+'job-types.json';
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }


  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
