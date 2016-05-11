import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CoordsService{

  private _lat : number;
  private _long : number;

  constructor(){}

  resolve(){
    return Observable.create( (observer:any) => {
        navigator.geolocation.getCurrentPosition(c => {
          observer.next(c.coords);
          observer.complete();
        });
    });
  }

}
