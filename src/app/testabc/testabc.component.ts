import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from './user';
import { USERS } from './mock-users';
import { UserService} from './user.service';

import {UserDetailComponent} from './user-detail.component';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */



console.log('`Testabc` component loaded asynchronously');

@Component({
  selector: 'testabc',
  styleUrls: ['./testabc.component.css'],
  templateUrl: './testabc.component.html',
  providers: [UserService]
})

export class TestabcComponent implements OnInit{
  localState: any;
  title ='Un titre';
  users: User[];
  selectedUser: User;

  constructor(private userService: UserService) {}

  getUsers(): void {
    //this.userService.getUsers().then(users => this.users = users);
    this.userService.getUsersSlowly().then(users => this.users = users);
  }

  onSelect(user: User): void{
    this.selectedUser = user;
  }
  ngOnInit(): void{
    this.getUsers()
  }

}
