import {Talent} from "./talent";
import {GPSLocation} from "./gps-location";
/**
 * Created by Khémon on 23/11/2016.
 */


export class User {
  public id: string;
  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;
  public address: string;
  public location?: GPSLocation;
  public talent?: Talent[]; // liste des talents
  public password?: string;
  public phone?: string;
  public about?: string;
  public create_time?: Date;
  public birthdate?: Date;
  public picture?: string;
  public hourlyRate?:string;
  constructor() {  }

  public getName(): string{
    return this.firstName+ " "+ this.lastName;
  }
}
