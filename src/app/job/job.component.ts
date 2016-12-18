/**
 * Created by Khémon on 15/12/2016.
 */

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Subscription, Observable} from "rxjs";
import {TAB_LIST} from './tabs';
import {JobService} from "../service/job.service";
import {Job} from "../model/job";
import {timeout} from "rxjs/operator/timeout";

console.log('`Job` component loaded asynchronously');

@Component({
  selector: 'job',
  templateUrl: 'job.component.html',
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

  public diff;
  public days;
  public hours;
  public minutes;
  public seconds;


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
              this.countdown();
              break;
            }
          }
        },
        error => console.log(<any>error));
  }


  countdown() {
    Observable.interval(1000).map((x) => {
      this.diff = Math.floor((this.job.date.getTime() - new Date().getTime()) / 1000);
    }).subscribe((x) => {
      this.days = this.getDays(this.diff);
      this.hours = this.getHours(this.diff);
      this.minutes = this.getMinutes(this.diff);
      this.seconds = this.getSeconds(this.diff);
    });
  }

  getDays(t){
    var days;
    days = Math.floor(t / 86400);

    return days;
  }

  getHours(t){
    var days, hours;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;

    return hours;
  }

  getMinutes(t){
    var days, hours, minutes;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;

    return minutes;
  }

  getSeconds(t){
    var days, hours, minutes, seconds;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

    return seconds;
  }

}
