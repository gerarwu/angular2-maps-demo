import {Injectable, Inject} from '@angular/core';
import {Http, Response} from '@angular/http';
import {CoordsService} from './coords.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TimeService{

  private _api : string = "https://api.timezonedb.com?format=json&key=5I3A6O2W3A4C";
  constructor(private _http : Http , private _coordsService :CoordsService ){
  }

  getTime( ){

    return Observable.create( (observer:any) => {

          this._coordsService.resolve().subscribe((d:any) => {
            this.resolveTime(d).subscribe(
              s => {
                observer.next(s)
                observer.complete();
              }
            );
          });
    });

  }

  resolveTime(coords:any){
    return this._http.get(this._api+"&lat="+coords.latitude+"&lng="+coords.longitude).map( (res : Response) => res.json() );
  }


}
