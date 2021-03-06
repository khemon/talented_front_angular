/**
 * Created by Khémon on 24/11/2016.
 */

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {User} from '../model/user';
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Contact` component loaded asynchronously');

@Component({
  //moduleId: module.id,
  selector: 'contact',
  templateUrl: 'contact.component.html'
})
export class ContactComponent {
  submitted = false;
  constructor(public route: ActivatedRoute) {

  }
  onSubmit() { this.submitted = true;}
  ngOnInit() {
  }


}
