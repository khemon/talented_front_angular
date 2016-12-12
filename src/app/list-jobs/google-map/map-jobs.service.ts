/**
 * Created by Khémon on 08/12/2016.
 */

/**
 * Created by Khémon on 03/12/2016.
 */
import {Injectable} from '@angular/core';
import {NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/common'
import {Marker} from "../../model/marker";
import {Job} from "../../model/job";


@Injectable()
export class MapJobsService {

  public jobs: Job[];
  public markerJobs: Marker[] = [];

  constructor() {  }


  /*
   clickedMarker(label: string, index: number) {
   //console.log(`clicked the marker: ${label || index}`)
   }
*/
/*
   mapClicked($event: MouseEvent) {
   this.markerJobs.push({
   lat: $event.coords.lat,
   lng: $event.coords.lng
   });
   }*/


  createMarkers(jobs: Job[]) {
    for (var i = 0; i < jobs.length; i++) {
      var marker = new Marker();
      marker.lat = jobs[i].location.latitude;
      marker.lng = jobs[i].location.longitude;
      marker.name = jobs[i].talent.name;

      this.markerJobs.push(marker);
    }
    //this.markersReady = true;
  }
}


