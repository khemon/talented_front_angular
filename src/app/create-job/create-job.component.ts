/**
 * Created by Khémon on 03/12/2016.
 */
import {Subscription } from 'rxjs';
import {Component, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {User} from '../model/user';
import {  NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/common'


console.log('`create-job` component loaded asynchronously');

declare var google: any;

@Component({
  selector: 'create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})

export class CreateJobComponent {
  localState: any;
  users: User[];
  step = 'inputStep';
  mapReady: boolean = false;
  jobType: string;
  private subscription: Subscription;


  constructor(private route: ActivatedRoute) {

  }
  changeStep(newStep: string): string{
    this.step = newStep;
    return this.step;
  }
  ngOnInit() {
    // subscribe to router event
    this.subscription = this.route.params.subscribe(
      (param: any) => {
        this.jobType= param['id'];
        console.log(this.jobType);
      });

/*
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: {lat: 48.87, lng: 2.33}
    });
    directionsDisplay.setMap(map);
    */
  }

}

