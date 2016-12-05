import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { AppState } from '../app.service';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./home.component.css'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})
export class HomeComponent {
  // Set our default values
  localState = {value: ''};
  // TypeScript public modifiers
  public items: Array<string> = ['Ménage', 'Déménagement', "Bricolage", 'Livraison', 'Baby-Sitting', "Cours/Coaching",'Transport de colis', 'Cuisine'];

  private value: any = {};
  private _disabledV: string = '0';
  private disabled: boolean = false;

  constructor(public appState: AppState,
              private router: Router) {

  }

  ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
  }


  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(jobType: any): void {
    console.log('Selected value is: ', jobType);
    this.router.navigate(['/create-job', jobType]);

  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }

  public typed(value: any): void {
    console.log('New search input: ', value);
  }

  public refreshValue(value: any): void {
    this.value = value;
  }
}
