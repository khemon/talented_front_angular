/**
 * Created by Khémon on 03/12/2016.
 */

import {Component, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {User} from '../model/user';
import {NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/common'


console.log('`create-job` component loaded asynchronously');

declare var google: any;

@Component({
  moduleId: module.id,
  selector: 'create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})

export class CreateJobComponent {
  localState: any;
  users: User[];
  jobType: string;
  private step: string = 'inputStep';
  private sub: any;

  constructor(private route: ActivatedRoute) {
  }
  changeStep(newStep: string){
    this.step = newStep;
  }
  ngOnInit() {

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: {lat: 48.87, lng: 2.33}
    });
    directionsDisplay.setMap(map);

    this.sub = this.route.params.subscribe(params => {
      this.jobType = params['jobType'];
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

