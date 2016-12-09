import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';
import {LoginComponent} from "./login";
import {RegisterComponent} from './register';
import {ContactComponent} from "./contact/";
import {ProfileComponent} from './profile';
import {TalentComponent} from "./talent/talent.component";
import {CreateJobComponent} from "./create-job";
import {ListUsersSearchComponent} from "./list-users-search/list-users-search.component";


export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register-user', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'list-users-search', component: ListUsersSearchComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'talent', component: TalentComponent},
  { path: 'create-job', component: CreateJobComponent},
  { path: '**',    component: NoContentComponent },
];
