/**
 * Created by Khémon on 21/11/2016.
 */

import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from "./user.service";
import {User} from "./user";
import 'rxjs/add/operator/switchMap';


@Component({
  moduleId: module.id,
  selector: 'my-user-detail',
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit{
  user: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit():void {
    this.route.params
      .switchMap((params: Params) => this.userService.getUser(+params['id']))
      .subscribe(hero => this.user = hero);
  }

  goBack(): void {
    this.location.back();
  }
}

