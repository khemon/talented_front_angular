import { Component, AfterViewChecked, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import {User} from '../model/user';
import {UserService} from '../list-users/user.service';
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Register` component loaded asynchronously');

@Component({
  moduleId: module.id,
  selector: 'register-user',
  styleUrls: ['./forms.css'],
  templateUrl: './register.component.html',
  providers: [UserService]
})
export class RegisterComponent {
  jobTypes = ['Cleaning', 'Delivery', 'Transport', 'Teach', 'Baby-Sitting']
  user = new User(18, '', '', '', '', '', '');
  users: User[];
  errorMessage: any;
  submitted = false
  localState: any;
  registerForm: NgForm;
  @ViewChild('registerForm') currentForm: NgForm;

  constructor(private userService: UserService){}

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.registerForm) {
      return;
    }
    this.registerForm = this.currentForm;
    if (this.registerForm) {
      this.registerForm.valueChanges.subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any) {
    if (!this.registerForm) {
      return;
    }
    const form = this.registerForm.form;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'name': '',
    'email': '',
    'userName': ''
  };

  validationMessages = {
    'name': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 4 characters long.',
      'maxlength': 'Name cannot be more than 24 characters long.',
      'forbiddenName': 'Someone named "Bob" cannot be a hero.'
    },
    'email': {
      'required': 'Email is required.'
    },
    'userName': {
      'required': 'Username is required.'
    }
  };

  onSubmit() {
    this.submitted = true;
    this.addUser(this.user);
  }

  addUser (user : User) {
    this.getUsers();
    this.userService.addUser(user)
     .subscribe(
     user  => this.users.push(user),
     error =>  this.errorMessage = <any>error);
    alert(this.users.toString());
  }
  getUsers(): void {
    this.userService.getUsers()
      .subscribe(
        users => this.users = users,
        error => this.errorMessage = <any>error);

  }



}
