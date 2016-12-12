import {Component, AfterViewChecked, ViewChild, NgZone} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MapsAPILoader} from 'angular2-google-maps/core';
import {User} from '../model/user';
import {UserService} from '../service/user.service';
import {TalentService} from "../service/talents.service";
import {Talent} from "../model/talent";
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Register` component loaded asynchronously');

declare var google: any;

@Component({
  //moduleId: module.id,
  selector: 'register-user',
  styleUrls: ['./forms.css'],
  templateUrl: './register.component.html',
  providers: [UserService, TalentService]
})
export class RegisterComponent {
  talents: Talent[];
  user: User;
  errorMessage: any;
  submitted = false
  localState: any;
  registerForm: NgForm;
  myOptions: any[];
  @ViewChild('registerForm') currentForm: NgForm;

  constructor(private userService: UserService,
              private talentService: TalentService,
              private __loader: MapsAPILoader,
              private __zone: NgZone) {
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.registerForm) {
      return;
    }
    this.registerForm = this.currentForm;
    if (this.registerForm) {
      this.registerForm.valueChanges.subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any) {
    if (!this.registerForm) {
      return;
    }
    const form = this.registerForm.form;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'name': '',
    'email': '',
    'userName': '',
    'firstName': '',
    'lastName': ''
  };

  validationMessages = {
    'name': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 4 characters long.',
      'maxlength': 'Name cannot be more than 24 characters long.',
      'forbiddenName': 'Someone named "Bob" cannot be a hero.'
    },
    'email': {
      'required': 'Email is required.'
    },
    'userName': {
      'required': 'Username is required.'
    }
  };

  ngOnInit(){
    this.user = new User();
    this.getTalents();
  }

  onSubmit() {
    this.submitted = true;
    this.addUser(this.user);
  }

  addUser(user: User) {
    this.userService.addUser(user)
      .subscribe(
        user => this.user,
        error => this.errorMessage = <any>error);
  }

  getTalents(){
    this.talentService.getTalents()
      .subscribe(
        talents => this.talents = talents,
        error => this.errorMessage = <any>error);
  }

  setSelectedTalents(selectElement) {
    for (var i = 0; i < selectElement.options.length; i++) {
      var optionElement = selectElement.options[i];
      var optionModel = this.myOptions[i];
      alert(optionModel);
      if (optionElement.selected == true) { optionModel.selected = true; }
      else { optionModel.selected = false; }
    }
  }

  /**
   * TODO: refactor tu mutualize code with autocomplete of create-job
   */
  autocomplete() {
    // autocomplete
    this.__loader.load().then(() => {
      var input = document.getElementById('register-form-address');
      //var input = this.inputAddress.nativeElement;
      var options = {componentRestrictions: {country: 'FR'}};
      let autocomplete = new google.maps.places.Autocomplete(input, options);
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        this.__zone.run(() => {
          let place = autocomplete.getPlace();
          if (place.geometry.location) {
            this.user.location.latitude = place.geometry.location.lat();
            this.user.location.longitude = place.geometry.location.lng();
            this.user.address = place.formatted_address;
          }
        });
      });
    });
  }


}
