/**
 * Created by Khémon on 24/11/2016.
 */
import {Component, Input} from '@angular/core';
import {User} from '../../model/user';
import {UserService} from "../../service/user.service";
import {Talent} from "../../model/talent";
import {Router} from "@angular/router";

console.log('`list-users` component loaded asynchronously');

@Component({
  selector: 'list-users',
  templateUrl: './list-users.component.html',
  providers: [UserService]
})

export class ListUsersComponent {
  @Input()
  limit: number; //limit the number of user to display
  errorMessage: string;
  users: User[];
  jobTypes: Array<Talent>;

  constructor(private router: Router,
              private userService: UserService) {
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(
        users => {this.users = users},
        error => this.errorMessage = <any>error);

  }
/*
  selectedUser(user: any){
    this.router.navigate(['/create-job', jobType]);
  }*/

  ngOnInit(): void {
    this.getUsers();
  }
}
