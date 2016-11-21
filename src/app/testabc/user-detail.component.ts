/**
 * Created by Khémon on 21/11/2016.
 */

import { Component, Input} from '@angular/core';
import {User} from './user';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent {
  @Input()
  user: User;
}
