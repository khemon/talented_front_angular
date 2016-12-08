/**
 * Created by Khémon on 07/12/2016.
 */



export class JobRequest {
  public skill: string;
  public address: string;
  public latitude: number;
  public longitude: number;
  public date: Date;
  public description: string;
  public id?: number;
  constructor() {
      this.date = new Date();
  }
}
