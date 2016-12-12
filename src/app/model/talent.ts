/**
 * Created by Khémon on 07/12/2016.
 */



export class Talent {
  public id: number;
  public name: string;
  public text?: string;
  constructor(  id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
