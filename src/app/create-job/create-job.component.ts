/**
 * Created by Khémon on 03/12/2016.
 */
import {Subscription, Observable} from 'rxjs';
import {Component, Injectable, NgZone, ViewChild, ElementRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../model/user';
import {NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/common'
import {MapsAPILoader} from 'angular2-google-maps/core';
import {JobRequest} from "../model/job-request";
import {JobRequestService} from "../service/job-request.service";
import {ProcessStep} from "./process-steps";
import {MapTalentService} from "./google-map/map-talents.service";
console.log('`create-job` component loaded asynchronously');

declare var google: any;


@Component({
  selector: 'create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css'],
  providers: [JobRequestService, MapTalentService]
})

export class CreateJobComponent {
  private step: number = ProcessStep.STEP_LIST.INPUT_REQUEST_STEP;
  private steps = ProcessStep.STEP_LIST;
  private jobType: string;
  private zoom: number = 15;
  private subscription: Subscription;
  private isNewJob: Boolean = true;
  private jobRequest: JobRequest;
  private errorMessage: string;

  //@ViewChild('autocompleteInput') inputAddress: ElementRef;
  constructor(private route: ActivatedRoute,
              private __loader: MapsAPILoader,
              private __zone: NgZone,
              private jobRequestService: JobRequestService,
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
        //this.addJobRequest();
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
  addJobRequest() {
    if (!this.jobRequest) {
      return;
    }
    this.jobRequestService.addJobRequest(this.jobRequest)
      .subscribe(
        jobRequest => alert("Job Request créée"),
        error =>  console.log(<any>error));
  }


  ngOnInit() {
    // subscribe to router event
    this.subscription = this.route.params.subscribe(
      (param: any) => {
        this.jobType = param['text'];
        console.log(this.jobType);
      });

    //this.autocomplete();
    this.jobRequest = new JobRequest();
    this.jobRequest.latitude= 48.866667;
    this.jobRequest.longitude=2.333333;
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
            this.jobRequest.latitude = place.geometry.location.lat();
            this.jobRequest.longitude = place.geometry.location.lng();
            this.jobRequest.address = place.formatted_address;

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


