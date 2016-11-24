/**
 * Created by Khémon on 22/11/2016.
 */

import {Component} from '@angular/core';
import {UserService} from "./user.service";

@Component({
  selector: 'my-app',
  template:  `
    <h1>{{title}}</h1>
    <nav>
    <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
    <a routerLink="/users" routerLinkActive="active">Users</a>
    </nav>
    <router-outlet></router-outlet>`,
  providers: [UserService]
})

export class AppTutoComponent {
  title ='Mon super titre';

}
