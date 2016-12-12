/**
 * Created by Khémon on 24/11/2016.
 */
import {Component} from '@angular/core';
import {TalentService} from "../service/talents.service";
import {Talent} from "../model/talent";

console.log('`list-users-search` component loaded asynchronously');

@Component({
  selector: 'list-users-search',
  templateUrl: './list-users-search.component.html',
  providers: [TalentService]
})

export class ListUsersSearchComponent {
  errorMessage: string;
  jobTypes: Array<Talent>;

  constructor(private jobTypeService: TalentService) {
  }


  getJobTypes():void{
    this.jobTypeService.getTalents()
      .subscribe(
        jobTypes => this.jobTypes = jobTypes,
        error => this.errorMessage = <any>error);
  }

  ngOnInit(): void {
    this.getJobTypes();
  }
}
