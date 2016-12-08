/**
 * Created by Khémon on 24/11/2016.
 */
import {Router} from '@angular/router';
import {Component} from '@angular/core';
import {User} from '../model/user';
import {UserService} from "../service/user.service";
import {JobTypeService} from "../service/job-type.service";
import {JobType} from "../model/job-type";

console.log('`list-users` component loaded asynchronously');

@Component({
  //moduleId: module.id,
  selector: 'list-users',
  templateUrl: './list-users.component.html',
  providers: [UserService, JobTypeService]
})

export class ListUsersComponent {
  localState: any;
  errorMessage: string;
  users: User[];
  selectedUser: User;
  jobTypes: Array<JobType>;
  mode = 'Observable';

  constructor(private userService: UserService,
              private jobTypeService: JobTypeService,
              private router: Router) {
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(
        users => this.users = users,
        error => this.errorMessage = <any>error);

  }

  getJobTypes():void{
    this.jobTypeService.getJobTypes()
      .subscribe(
        jobTypes => this.jobTypes = jobTypes,
        error => this.errorMessage = <any>error);
  }
  onSelect(user: User): void {
    this.selectedUser = user;
  }

  addUser(user: User) {
    if (!user) {
      return;
    }
    this.userService.addUser(user)
      .subscribe(
        user => this.users.push(user),
        error => this.errorMessage = <any>error);
  }

  ngOnInit(): void {
    this.getUsers();
    this.getJobTypes();
  }
}
