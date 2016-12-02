/**
 * Created by Khémon on 23/11/2016.
 */


export class User {
  constructor(
    public id: number,
    public name: string ,
    public userName: string,
    public password: string,
    public email: string,
    public jobType: string,
    public phone?: string

  ) {  }
}
