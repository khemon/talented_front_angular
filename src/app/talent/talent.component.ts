/**
 * Created by Khémon on 24/11/2016.
 */

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {User} from '../model/user';

console.log('`Register` component loaded asynchronously');

@Component({
  selector: 'talent',
  templateUrl: 'talent.component.html'

})
export class TalentComponent {
  constructor(public route: ActivatedRoute){}
}
