import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Testabc` component loaded asynchronously');

@Component({
  selector: 'testabc',
  styles: [`
  `],
  templateUrl: './testabc.component.html'
})

export class TestabcComponent {
  localState: any;

  constructor(public route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
        this.localState = data.yourData;
      });

  }

}
