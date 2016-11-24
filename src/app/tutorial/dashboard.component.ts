/**
 * Created by Khémon on 22/11/2016.
 */

import { Component, OnInit } from '@angular/core';

import { User } from './user';
import { UserService} from './user.service';

@Component ({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [UserService]

})

export class DashboardComponent implements OnInit{
  users: User[] = [];

  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.userService.getUsers()
      .then(users => this.users = users.slice(1, 5));
  }
}
