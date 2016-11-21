import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';
import {TestabcComponent} from "./testabc";
import {RegisterComponent} from "./register";
import {ProfileComponent} from "./profile";
import { DataResolver } from './app.resolver';



export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'testabc', component: TestabcComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**',    component: NoContentComponent },
];
