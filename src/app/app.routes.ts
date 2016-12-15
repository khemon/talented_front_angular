import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';
import {LoginComponent} from "./login";
import {RegisterComponent} from './register';
import {ContactComponent} from "./contact/";
import {ProfileComponent} from './profile';
import {TalentWorkerComponent} from "./talent-worker/talent-worker.component";
import {CreateJobComponent} from "./create-job";
import {ListUsersSearchComponent} from "./list-users-search/list-users-search.component";
import {ListJobsComponent} from "./list-jobs/list-jobs.component";
import {JobComponent} from "./job/job.component";


export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register-user', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'list-users-search', component: ListUsersSearchComponent},
  { path: 'list-jobs', component: ListJobsComponent},
  { path: 'job', component: JobComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'talent-worker', component: TalentWorkerComponent},
  { path: 'create-job', component: CreateJobComponent},
  { path: '**',    component: NoContentComponent },
];
