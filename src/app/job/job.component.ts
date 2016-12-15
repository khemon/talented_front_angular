/**
 * Created by Khémon on 15/12/2016.
 */

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Subscription} from "rxjs";
import {TAB_LIST} from './tabs';
import {JobService} from "../service/job.service";
import {Job} from "../model/job";

console.log('`Job` component loaded asynchronously');

@Component({
  selector: 'job',
  templateUrl: 'job.component2.html',
  styleUrls: ['job.component.css'],
  providers: [JobService]

})
export class JobComponent {
  public tabs= TAB_LIST;
  public currentTab: number = TAB_LIST.DESCRIPTION;
  private jobId: string;
  public isJobPageReady = false;
  private subscription: Subscription;
  public job: Job;


  constructor(private route: ActivatedRoute,
              private jobService: JobService) {
  }

  ngOnInit() {
    // subscribe to router event
    this.subscription = this.route.queryParams.subscribe(
      (param: any) => {
        this.jobId = param['id'];
        console.log(this.jobId);
      });
    this.getJobById(this.jobId);

  }
  getJobById(jobId: string): void {
    /* TODO: modifier pour appeler le service getJobById()
     */
    if(jobId == null){ return;}
    this.jobService.getJobs()
      .subscribe(
        jobs => {
          // TODO: utlie pour le mode mockData - à modifier en cible
          for(let i= 0; i < jobs.length; i++){
            if(jobs[i].id == jobId){
              this.job = jobs[i];
              this.isJobPageReady = true;
              break;
            }
          }
        },
        error => console.log(<any>error));
  }

}
