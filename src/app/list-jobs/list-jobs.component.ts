/**
 * Created by Khémon on 11/12/2016.
 */
import {Component, Injectable, NgZone, ViewChild, ElementRef} from '@angular/core';
import {JobService} from "../service/job.service";
import {Job} from "../model/job";
import {Subscription} from "rxjs";
import {Marker} from "../model/marker";
import {MapJobsService} from "./google-map/map-jobs.service";
console.log('`list-jobs` component loaded asynchronously');

declare var google: any;


@Component({
  selector: 'list-jobs',
  templateUrl: './list-jobs.component.html',
  styleUrls: ['./list-jobs.component.css'],
  providers: [ MapJobsService, JobService]
})

export class ListJobsComponent {

  public jobs: Job[];
  public zoom: number = 10;
  public latitude: number;
  public longitude: number;
  public nbJobs: number = 0;



  constructor( private jobService: JobService,
              private mapJobService: MapJobsService) {
  }

  ngOnInit() {
    this.getJobs();

  }

  getJobs(): void {
    this.jobService.getJobs()
      .subscribe(
        jobs => {
          this.jobs = jobs;
          this.nbJobs = this.jobs.length;
          this.mapJobService.createMarkers(jobs);
          this.latitude = this.mapJobService.markerJobs[0].lat;
          this.longitude = this.mapJobService.markerJobs[0].lng;
        },
        error => console.log(<any>error)
      )
  }


}


