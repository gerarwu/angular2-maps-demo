"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var time_service_1 = require('./time.service');
var coords_service_1 = require('./coords.service');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var AppComponent = (function () {
    function AppComponent(_timeService, _coordsService) {
        this._timeService = _timeService;
        this._coordsService = _coordsService;
        this.title = "Time clock";
        this.isOn = false;
        this.isDisabled = false;
        this.taskClock();
        this.map();
    }
    AppComponent.prototype.map = function () {
        this._coordsService.resolve().subscribe(function (c) {
            var cord = { lat: c.latitude, lng: c.longitude };
            setTimeout(function () {
                //let map = new google.maps.Map(document.getElementById('map'), { center: cord, zoom: 15 });
                new google.maps.Marker({
                    map: new google.maps.Map(document.getElementById('map'), { center: cord, zoom: 15 }),
                    position: cord,
                    title: 'Hola'
                });
            }, 1000);
        });
    };
    AppComponent.prototype.toggle = function (newState) {
        if (!this.isDisabled) {
            this.isOn = newState;
        }
    };
    AppComponent.prototype.taskClock = function () {
        var _this = this;
        this._timeService.getTime().subscribe(function (res) {
            _this.zoneName = res.zoneName;
            _this.stamp = new Date(res.timestamp * 1000);
            _this.stamp = new Date(_this.stamp.getUTCFullYear(), _this.stamp.getUTCMonth(), _this.stamp.getUTCDate(), _this.stamp.getUTCHours(), _this.stamp.getUTCMinutes(), _this.stamp.getUTCSeconds());
            _this.startClock();
        });
    };
    AppComponent.prototype.startClock = function () {
        var _this = this;
        setInterval(function () {
            _this.stamp = new Date(_this.stamp.getTime() + 1000);
        }, 1000);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './app/views/dashboard.html',
            styleUrls: ['./app/views/style.css'],
            providers: [http_1.HTTP_PROVIDERS, time_service_1.TimeService, coords_service_1.CoordsService]
        }), 
        __metadata('design:paramtypes', [time_service_1.TimeService, coords_service_1.CoordsService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map