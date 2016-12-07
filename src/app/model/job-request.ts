/**
 * Created by Khémon on 07/12/2016.
 */



export class ServiceRequest {
  constructor(
    public skill: string ,
    public address: string ,
    public latitude: string ,
    public longitude: string ,
    public date: Date,
    public description: string,
    public id?: number
  ) {  }
}
