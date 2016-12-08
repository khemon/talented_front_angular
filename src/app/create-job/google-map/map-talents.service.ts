/**
 * Created by Khémon on 08/12/2016.
 */

/**
 * Created by Khémon on 03/12/2016.
 */
import {Subscription, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/common'
import {User} from '../../model/user';
import {Marker} from "./marker";
import {UserService} from "../../service/user.service";


@Injectable()
export class MapTalentService {
  public users: User[];
  public zoom: number = 10;
  public nbUsers:number;
  /*public latitude: number;
   public longitude: number;*/
  private errorMessage: string;
  private subscription: Subscription;


  markerTalents: Marker[] = [];

  constructor(private userService: UserService) {
    this.userService = userService;
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

  getTalentMarkers() {
    this.userService.getTalentsAvailableByJob()
      .subscribe(
        users => {
          this.users = users;
          this.createMarkers(users);
        }
        ,
        error => console.log(<any>error));

  }

  createMarkers(users: User[]) {
    for (var i = 0; i < users.length; i++) {
      var marker = new Marker();
      marker.lat = users[i].latitude;
      marker.lng = users[i].longitude;
      marker.name = users[i].name;
      this.markerTalents.push(marker);
    }
    this.nbUsers = i+1;
  }

}


