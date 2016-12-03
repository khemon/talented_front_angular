/**
 * Created by Khémon on 24/11/2016.
 */
import {Router} from '@angular/router';
import {Component} from '@angular/core';
import {User} from '../model/user';
import {UserService} from "./user.service";

console.log('`list-users` component loaded asynchronously');

@Component({
  moduleId: module.id,
  selector: 'list-users',
  templateUrl: 'list-users.component.html',
  providers: [UserService]
})

export class ListUsersComponent {
  localState: any;
  errorMessage: string;
  users: User[];
  selectedUser: User;
  mode = 'Observable';

  constructor(private userService: UserService,
              private router: Router) {
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(
        users => this.users = users,
        error => this.errorMessage = <any>error);

  }


  onSelect(user: User): void {
    this.selectedUser = user;
  }

  ngOnInit(): void {
    this.getUsers()
  }
}
