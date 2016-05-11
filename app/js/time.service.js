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
var http_1 = require('@angular/http');
var coords_service_1 = require('./coords.service');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
var TimeService = (function () {
    function TimeService(_http, _coordsService) {
        this._http = _http;
        this._coordsService = _coordsService;
        this._api = "https://api.timezonedb.com?format=json&key=5I3A6O2W3A4C";
    }
    TimeService.prototype.getTime = function () {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this._coordsService.resolve().subscribe(function (d) {
                _this.resolveTime(d).subscribe(function (s) {
                    observer.next(s);
                    observer.complete();
                });
            });
        });
    };
    TimeService.prototype.resolveTime = function (coords) {
        return this._http.get(this._api + "&lat=" + coords.latitude + "&lng=" + coords.longitude).map(function (res) { return res.json(); });
    };
    TimeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, coords_service_1.CoordsService])
    ], TimeService);
    return TimeService;
}());
exports.TimeService = TimeService;
//# sourceMappingURL=time.service.js.map