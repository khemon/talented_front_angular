import {JobType} from "./job-type";
/**
 * Created by Khémon on 23/11/2016.
 */


export class User {
  constructor(
    public id: string,
    public name: string,
    public username?: string,
    public email?: string,
    public password?: string,
    public address?: string,
    public latitude?: number,
    public longitude?: number,
    public jobTypes?: JobType[],
    public phone?: string,
    public about?: string,
    public registered?: Date,
    public age?: number,
    public picture?: string,
    public hourlyRate?:string
  ) {  }
}
