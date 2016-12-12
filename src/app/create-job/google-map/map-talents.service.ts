/**
 * Created by Khémon on 08/12/2016.
 */


import {Subscription, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {User} from '../../model/user';
import {Marker} from "../../model/marker";
import {UserService} from "../../service/user.service";


@Injectable()
export class MapTalentService {
  public users: User[];
  public nbUsers:number;
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
      marker.lat = users[i].location.latitude;
      marker.lng = users[i].location.longitude;
      marker.name = users[i].firstName + " " +users[i].lastName;
      this.markerTalents.push(marker);
    }
    this.nbUsers = users.length;
  }

}


