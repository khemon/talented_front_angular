/**
 * Created by Khémon on 07/12/2016.
 */
import {Injectable, Inject} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {JobRequest} from '../model/job-request';
import {Observable} from 'rxjs/Observable';
import {AppConfig, APP_CONFIG} from '../app-config';
import 'rxjs/Rx';

@Injectable()
export class JobRequestService {
  private apiEndPoint = 'jobRequest';
  private apiUrl;
  private mockDataUrl;

  constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: Http) {
    // Base URL for Talented API
    this.apiUrl = config.apiUrl;
    this.mockDataUrl = config.mockDataUrl;
  }

  /**
   * Retourne la liste des job request de la BDD
   */
  getJobRequests(): Observable<JobRequest[]>{
    //var url = this.apiUrl + this.apiEndPoint;
    //TODO: remove this url once backend is ready
    var url = this.mockDataUrl+'job-request.json';
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * post a new job request to server
   * @param user
   * @returns {Observable<JobRequest>}
   */
  addJobRequest(jobRequest: JobRequest): Observable<JobRequest> {
    let userString = JSON.stringify(jobRequest);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.apiUrl + 'jobRequest/add', userString, options)
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
