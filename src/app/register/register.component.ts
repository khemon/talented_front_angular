import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {User} from '../model/user';
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Register` component loaded asynchronously');

@Component({
  moduleId: module.id,
  selector: 'register',
  styleUrls: ['./forms.css'],
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  jobTypes = ['Cleaning', 'Delivery', 'Transport', 'Teach', 'Baby-Sitting']
  model = new User(18, 'John Doe', 'johndoe', 'pwd', 'john.doe@gmail.com', this.jobTypes[0], '0478548945');
  submitted = false
  localState: any;
  constructor(public route: ActivatedRoute) {

  }
  onSubmit() { this.submitted = true;}

  // TODO: remove this when we're done
  get diagnostic(){
    return JSON.stringify(this.model)
  }

  ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
        this.localState = data.yourData;
      });

    console.log('hello `Register` component');
    // static data that is bundled
    // var mockData = require('assets/mock-data/mock-data.json');
    // console.log('mockData', mockData);
    // if you're working with mock data you can also use http.get('assets/mock-data/mock-data.json')
    this.asyncDataWithWebpack();
  }
  asyncDataWithWebpack() {
    // you can also async load mock data with 'es6-promise-loader'
    // you would do this if you don't want the mock-data bundled
    // remember that 'es6-promise-loader' is a promise
    setTimeout(() => {

      System.import('../../assets/mock-data/mock-data.json')
        .then(json => {
          console.log('async mockData', json);
          this.localState = json;
        });

    });
  }

}
