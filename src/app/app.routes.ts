import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';
import {LoginComponent} from "./login";
import {RegisterComponent} from './register';
import {ContactComponent} from "./contact/";
import {ProfileComponent} from './profile';
import {TalentComponent} from "./talent/talent.component";
import {ListUsersComponent} from "./list-users";
import {CreateJobComponent} from "./create-job";


export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'about', component: AboutComponent },
  { path: 'register-user', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'list-users', component: ListUsersComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'talent', component: TalentComponent},
  { path: 'create-job', component: CreateJobComponent},
  { path: '**',    component: NoContentComponent },
];
