/**
 * Created by Khémon on 03/12/2016.
 */
import {Subscription, Observable} from 'rxjs';
import {Component, Injectable, NgZone} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../model/user';
import {NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/common'
import {MapsAPILoader} from 'angular2-google-maps/core';

console.log('`create-job` component loaded asynchronously');

declare var google: any;


@Component({
  selector: 'create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})

@Injectable()
export class CreateJobComponent {
  users: User[];
  step = 'inputStep';
  jobType: string;
  private lat: number = 48.866667;
  private lng: number = 2.333333;
  private zoom: number = 15;
  private place: string;

  private subscription: Subscription;
  private markerService: marker = {
    lat: 48.866667,
    lng: 2.333333,
    draggable: true
  }

  markerTalents: marker[] = [
    {
      lat: 48.8784866,
      lng: 2.325547400000005,
      draggable: true,
      label: "talentA"
    },
    {
      lat: 48.8708714,
      lng: 2.3322167999999692,
      draggable: true,
      label: "talentB"
    },
    {
      lat: 48.8708714,
      lng: 2.3322167999999692,
      draggable: true,
      label: "talentC"
    }
  ];

  constructor(private route: ActivatedRoute,  private __loader: MapsAPILoader,
  private __zone: NgZone){  }


  relocate(address:string, lat:number, lng:number ){
    this.lat = lat;
    this.lng = lng;
    this.place = address;
    alert(this.place);
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

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: MouseEvent) {
    this.markerService.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng
    });
  }


  changeStep(newStep: string): string {
    this.step = newStep;
    return this.step;
  }

  ngOnInit() {
    // subscribe to router event
    this.subscription = this.route.params.subscribe(
      (param: any) => {
        this.jobType = param['id'];
        console.log(this.jobType);
      });

    // autocomplete

    this.__loader.load().then(() => {
      var input = document.getElementById('autocompleteInput');
      var options = { componentRestrictions: {country: 'FR' }};
      let autocomplete = new google.maps.places.Autocomplete(input, options);
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        this.__zone.run(() => {
          let place = autocomplete.getPlace();
          if (place.geometry.location) {
            this.lat = place.geometry.location.lat();
            this.lng = place.geometry.location.lng();
            this.markerService.lat = this.lat;
            this.markerService.lng = this.lng;
          }
        });
      });
    });
  }

}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  draggable: boolean;
  label?: string;
}

