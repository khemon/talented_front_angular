import  { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule  } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import  { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
//import { Ng2SelectModule } from 'ng2-material-select';

// App is our top level component
import  { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { ContactComponent } from './contact';
import { NoContentComponent } from './no-content';
import {LoginComponent} from "./login";
import {RegisterComponent} from "./register";
import {ProfileComponent} from "./profile";
import {TalentsComponent} from "./talents";
import {ListUsersComponent} from "./list-users";
import { InMemoryWebApiModule} from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data/in-memory-data.service';

/*import {TalentsComponent} from "./talents";
import {UserDetailComponent} from "./tutorial/user-detail.component";
import {DashboardComponent} from "./tutorial/dashboard.component";
import {AppTutoComponent} from "./tutorial/apptuto.component";
import {UsersComponent} from "./tutorial/users.component";*/
//import { XLarge } from './home/x-large';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    //Ng2SelectModule,
    LoginComponent,
    RegisterComponent,
    ContactComponent,
    AboutComponent,
    HomeComponent,
    NoContentComponent,
    ProfileComponent,
    TalentsComponent,
    ListUsersComponent,


/*AppTutoComponent,
 DashboardComponent,
 UsersComponent,
 UserDetailComponent,*/
    /*,
    XLarge*/
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}

