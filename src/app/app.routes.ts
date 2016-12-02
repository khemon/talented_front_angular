import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';
import {LoginComponent} from "./login";
import {RegisterComponent} from './register';
import {ContactComponent} from "./contact/";
import {ProfileComponent} from './profile';
import {UserDetailComponent} from './tutorial/user-detail.component';
import {DashboardComponent} from './tutorial/dashboard.component';
import {UsersComponent} from './tutorial/users.component';
import {AppTutoComponent} from "./tutorial/apptuto.component";
import {TalentsComponent} from "./talents/talents.component";
import {ListUsersComponent} from "./list-users";





export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'talents', component: TalentsComponent},
  { path: 'list-users', component: ListUsersComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent},
  /*{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'users', component: UsersComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: UserDetailComponent },*/
  { path: '**',    component: NoContentComponent },
];
