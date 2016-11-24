import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {User} from './user';
import { UserService} from './user.service';

import {UserDetailComponent} from './user-detail.component';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */



console.log('`Users` component loaded asynchronously');

@Component({
  moduleId: module.id,
  selector: 'my-users',
  styleUrls: ['./users.component.css'],
  templateUrl: './users.component.html',
})

export class UsersComponent implements OnInit{
  localState: any;
  users: User[];
  selectedUser: User;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  getUsers(): void {
    this.userService.getUsers().then(users => this.users = users);
    //this.userService.getUsersSlowly().then(users => this.users = users);
  }

  onSelect(user: User): void{
    this.selectedUser = user;
  }
  ngOnInit(): void{
    this.getUsers()
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedUser.id]);
  }

}
