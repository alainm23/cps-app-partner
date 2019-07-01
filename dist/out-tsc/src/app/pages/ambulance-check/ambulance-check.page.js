import * as tslib_1 from "tslib";
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Events } from '@ionic/angular';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { DatabaseService } from '../../services/database.service';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { ApiService } from '../../services/api.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
var AmbulanceCheckPage = /** @class */ (function () {
    function AmbulanceCheckPage(navCtrl, alertController, events, database, storage, loadingController, api, auth, payment, geolocation) {
        this.navCtrl = navCtrl;
        this.alertController = alertController;
        this.events = events;
        this.database = database;
        this.storage = storage;
        this.loadingController = loadingController;
        this.api = api;
        this.auth = auth;
        this.payment = payment;
        this.geolocation = geolocation;
    }
    AmbulanceCheckPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.getParams('params').then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var params, _a;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        params = JSON.parse(data);
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Hellooo'
                            })];
                    case 1:
                        _a.loading = _b.sent();
                        return [4 /*yield*/, this.loading.present()];
                    case 2:
                        _b.sent();
                        this.database.getSendAmbulance(params.id).subscribe(function (data) {
                            if (data) {
                                _this.ambulance_object = data;
                                _this.InitMap(data.latitude, data.longitude);
                                if (data.state === 'sent') {
                                    _this.addRute(data.latitude, data.longitude, data.ambulance_ori_lat, data.ambulance_ori_lon);
                                }
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    };
    AmbulanceCheckPage.prototype.InitMap = function (latitude, longitude) {
        this.loading.dismiss();
        var location = new google.maps.LatLng(latitude, longitude);
        var options = {
            center: location,
            zoom: 17,
            disableDefaultUI: true,
            streetViewControl: false,
            disableDoubleClickZoom: false,
            clickableIcons: false,
            scaleControl: true,
            styles: [
                {
                    "featureType": "poi",
                    "elementType": "labels.text",
                    "stylers": [{
                            "visibility": "off"
                        }]
                },
                {
                    "featureType": "poi.business",
                    "stylers": [{
                            "visibility": "off"
                        }]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.icon",
                    "stylers": [{
                            "visibility": "off"
                        }]
                },
                {
                    "featureType": "transit",
                    "stylers": [{
                            "visibility": "off"
                        }]
                }
            ],
            mapTypeId: 'roadmap',
        };
        this.map = new google.maps.Map(this.mapRef.nativeElement, options);
        this.marker = new google.maps.Marker({
            position: location,
            map: this.map,
            title: 'Direccion',
            animation: google.maps.Animation.DROP
        });
        this.directionsDisplay = new google.maps.DirectionsRenderer();
        this.directionsService = new google.maps.DirectionsService();
    };
    AmbulanceCheckPage.prototype.update = function (arrived, canceled) {
        /*
        const confirm = this.alertCtrl.create({
          title: '¿Cancelar pedido?',
          message: 'Estas seguro que deseas cancelar este pedido',
          buttons: [
            {
              text: 'Cancel',
              handler: () => {
                
              }
            },
            {
              text: 'Ok',
              handler: (data) => {
    
                this.loading = this.loadingCtrl.create ({
                  content: 'Cargando...'
                });
                
                this.loading.present ().then (() => {
                    this.database.updateSendAmbulance (this.ambulance_object.id, arrived, canceled)
                      .then (() => {
                        this.loading.dismiss ();
                        this.goHome ();
                      });
                });
              }
            }
          ]
        });
    
        confirm.present();
        */
    };
    AmbulanceCheckPage.prototype.cancel = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: '¿Cancelar pedido?',
                            message: 'Estas seguro que deseas cancelar este pedido',
                            inputs: [
                                {
                                    name: 'message',
                                    placeholder: 'Motivo de cancelacion'
                                },
                            ],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    handler: function () {
                                    }
                                },
                                {
                                    text: 'Ok',
                                    handler: function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                        var loading;
                                        return tslib_1.__generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, this.loadingController.create({
                                                        message: 'Procesando ...'
                                                    })];
                                                case 1:
                                                    loading = _a.sent();
                                                    return [4 /*yield*/, loading.present()];
                                                case 2:
                                                    _a.sent();
                                                    return [4 /*yield*/, this.database.cancelSendAmbulance(this.ambulance_object, data.message)];
                                                case 3:
                                                    _a.sent();
                                                    loading.dismiss();
                                                    this.goHome();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        alert.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    AmbulanceCheckPage.prototype.callNow = function () {
        /*
        this.callNumber.callNumber("+51989316622", true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
        */
    };
    AmbulanceCheckPage.prototype.addRute = function (latitude, longitude, ambulance_lat, ambulance_lon) {
        var _this = this;
        var point_ambulance = new google.maps.LatLng(ambulance_lat, ambulance_lon);
        var point_destino = new google.maps.LatLng(latitude, longitude);
        this.directionsDisplay.setMap(this.map);
        var request = {
            origin: point_ambulance,
            destination: point_destino,
            travelMode: google.maps.TravelMode['DRIVING']
        };
        this.directionsService.route(request, function (response, status) {
            if (status == 'OK') {
                _this.directionsDisplay.setDirections(response);
            }
        });
        this.marker_ambulance = new google.maps.Marker({
            position: point_ambulance,
            map: this.map,
            icon: 'assets/ambulance.svg'
        });
        this.marker_ambulance.setMap(this.map);
    };
    AmbulanceCheckPage.prototype.updateMark = function (ambulance_lat, ambulance_lon) {
        var location = new google.maps.LatLng(ambulance_lat, ambulance_lon);
        this.marker_ambulance.setPosition(location);
    };
    AmbulanceCheckPage.prototype.arrived = function () {
        /*
        const confirm = this.alertCtrl.create({
          title: 'Use this lightsaber?',
          message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
          buttons: [
            {
              text: 'Cancel',
              handler: () => {
                
              }
            },
            {
              text: 'Ok',
              handler: () => {
                this.loading = this.loadingCtrl.create ({
                  content: 'Cargando...'
                });
                
                this.loading.present ().then (() => {
                  this.database.updateSendAmbulanceArrived (this.ambulance_object)
                    .then (() => {
                      this.loading.dismiss ();
                      this.goHome ();
                    });
                });
              }
            }
          ]
        });
    
        confirm.present();
        */
    };
    AmbulanceCheckPage.prototype.goHome = function () {
        this.navCtrl.navigateRoot('home');
    };
    tslib_1.__decorate([
        ViewChild('map2'),
        tslib_1.__metadata("design:type", ElementRef)
    ], AmbulanceCheckPage.prototype, "mapRef", void 0);
    AmbulanceCheckPage = tslib_1.__decorate([
        Component({
            selector: 'app-ambulance-check',
            templateUrl: './ambulance-check.page.html',
            styleUrls: ['./ambulance-check.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertController,
            Events,
            DatabaseService,
            StorageService,
            LoadingController,
            ApiService,
            AuthService,
            PaymentService,
            Geolocation])
    ], AmbulanceCheckPage);
    return AmbulanceCheckPage;
}());
export { AmbulanceCheckPage };
//# sourceMappingURL=ambulance-check.page.js.map