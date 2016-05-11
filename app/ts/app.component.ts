import {Component} from '@angular/core';
import {TimeService} from './time.service';
import {CoordsService} from './coords.service';
import {ClockComponent} from './clock.component';
import {Http, HTTP_PROVIDERS, Response} from '@angular/http';

import 'rxjs/add/operator/map';

@Component({
    selector: 'my-app',
    templateUrl: './app/views/dashboard.html',
    styleUrls: ['./app/views/style.css'],
    providers:[HTTP_PROVIDERS, TimeService, CoordsService]

})
export class AppComponent {

  public title : string = "Time clock";
  public stamp: Date;
  public zoneName: string;

  public isOn : boolean = false;
  public isDisabled :boolean = false;


  constructor(private _timeService : TimeService, private _coordsService : CoordsService){

    this.taskClock();
    this.map();
  }


  map(){

    this._coordsService.resolve().subscribe( (c:any) => {

      let cord = {lat:c.latitude, lng:c.longitude};
      setTimeout( ()=> {

            //let map = new google.maps.Map(document.getElementById('map'), { center: cord, zoom: 15 });
            new google.maps.Marker({
              map:new google.maps.Map(document.getElementById('map'), { center: cord, zoom: 15 }),
              position:cord,
              title: 'Hola'
            });

      }, 1000 );
    });
  }

  toggle(newState:boolean) {
    if (!this.isDisabled) {
      this.isOn = newState;
    }
  }

  taskClock(){
    this._timeService.getTime().subscribe( (res:any) => {
       this.zoneName = res.zoneName;
       this.stamp = new Date(res.timestamp*1000)
       this.stamp = new Date(this.stamp.getUTCFullYear(),this.stamp.getUTCMonth(),this.stamp.getUTCDate(),this.stamp.getUTCHours(),this.stamp.getUTCMinutes(),this.stamp.getUTCSeconds());
       this.startClock();
    });
  }

  startClock(){
    setInterval( ()=>{
       this.stamp = new Date(this.stamp.getTime() + 1000);
    }, 1000 );
  }





}
