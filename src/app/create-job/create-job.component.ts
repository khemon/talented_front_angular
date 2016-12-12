/**
 * Created by Khémon on 03/12/2016.
 */
import {Subscription, Observable} from 'rxjs';
import {Component, Injectable, NgZone, ViewChild, ElementRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/common'
import {MapsAPILoader} from 'angular2-google-maps/core';
import {Job} from "../model/job";
import {JobService} from "../service/job.service";
import {ProcessStep} from "./process-steps";
import {MapTalentService} from "./google-map/map-talents.service";
import {GPSLocation} from "../model/gps-location";
console.log('`create-job` component loaded asynchronously');

declare var google: any;


@Component({
  selector: 'create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css'],
  providers: [JobService, MapTalentService]
})

export class CreateJobComponent {
  private step: number = ProcessStep.STEP_LIST.INPUT_REQUEST_STEP;
  private steps = ProcessStep.STEP_LIST;
  private jobType: string;
  private zoom: number = 15;
  private subscription: Subscription;
  private isNewJob: Boolean = true;
  private job: Job;
  private errorMessage: string;

  //@ViewChild('autocompleteInput') inputAddress: ElementRef;
  constructor(private route: ActivatedRoute,
              private __loader: MapsAPILoader,
              private __zone: NgZone,
              private jobService: JobService,
              private mapTalent: MapTalentService) {
  }



/*
  clickedMarker(label: string, index: number) {
    //console.log(`clicked the marker: ${label || index}`)
  }


   mapClicked($event: MouseEvent) {
   this.markerService.push({
   lat: $event.coords.lat,
   lng: $event.coords.lng
   });
   }*/


  changeStep(newStep: number): number {
    this.step = newStep;
    switch(newStep) {
      case ProcessStep.STEP_LIST.INPUT_REQUEST_STEP:
        break;
      case ProcessStep.STEP_LIST.NOTIFY_STEP:
        if(!this.isNewJob){ break;}
        //this.addJob();
        this.mapTalent.getTalentMarkers();
        break;
      case ProcessStep.STEP_LIST.SELECT_TALEENT_STEP:
        break;
      case ProcessStep.STEP_LIST.BUY_STEP:
        break;
      case ProcessStep.STEP_LIST.DONE_STEP:
        break;
      default:
        //default code block
    }

    return this.step;
  }
  addJob() {
    if (!this.job) {
      return;
    }
    this.jobService.addJob(this.job)
      .subscribe(
        Job => alert("Job Request créée"),
        error =>  console.log(<any>error));
  }


  ngOnInit() {
    // subscribe to router event
    this.mapTalent.getTalentMarkers();
    this.subscription = this.route.params.subscribe(
      (param: any) => {
        this.jobType = param['text'];
        console.log(this.jobType);
      });

    //this.autocomplete();
    this.job = new Job();
    this.job.location = new GPSLocation();
    this.job.location.latitude= 48.866667;
    this.job.location.longitude=2.333333;
  }

  ngAfterViewInit() {

    this.autocomplete();
  }

  autocomplete() {
    // autocomplete
    this.__loader.load().then(() => {
      var input = document.getElementById('autocompleteInput');
      //var input = this.inputAddress.nativeElement;
      var options = {componentRestrictions: {country: 'FR'}};
      let autocomplete = new google.maps.places.Autocomplete(input, options);
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        this.__zone.run(() => {
          let place = autocomplete.getPlace();
          if (place.geometry.location) {
            this.job.location = new GPSLocation();
            this.job.location.latitude = place.geometry.location.lat();
            this.job.location.longitude = place.geometry.location.lng();
            this.job.address = place.formatted_address;

          }
        });
      });
    });
  }

  /*
   getLocation(){
   this.__loader.load().then(() => {
   console.log('google script loading geocoder');
   let geocoder = new google.maps.Geocoder();
   geocoder.geocode( {'address': this.place}, function (results, status) {
   if (status == google.maps.GeocoderStatus.OK) {
   //map.setCenter(results[0].geometry.location);
   var test = results[0].geometry.location;
   return location;
   } else {
   window.alert('Geocode was not successful for the following reason: ' + status);
   }

   })
   });
   }*/


}


