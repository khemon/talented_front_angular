/**
 * Created by Khémon on 24/11/2016.
 */
import {Component} from '@angular/core';
import {JobTypeService} from "../service/job-type.service";
import {JobType} from "../model/job-type";

console.log('`list-users-search` component loaded asynchronously');

@Component({
  selector: 'list-users-search',
  templateUrl: './list-users-search.component.html',
  providers: [JobTypeService]
})

export class ListUsersSearchComponent {
  errorMessage: string;
  jobTypes: Array<JobType>;

  constructor(private jobTypeService: JobTypeService) {
  }


  getJobTypes():void{
    this.jobTypeService.getJobTypes()
      .subscribe(
        jobTypes => this.jobTypes = jobTypes,
        error => this.errorMessage = <any>error);
  }

  ngOnInit(): void {
    this.getJobTypes();
  }
}
