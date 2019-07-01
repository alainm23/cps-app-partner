import * as tslib_1 from "tslib";
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NavController, LoadingController } from '@ionic/angular';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { ApiService } from '../../services/api.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
// Ionic
import { ModalController } from '@ionic/angular';
// Modals
import { SelectCountriesPage } from '../../modals/select-countries/select-countries.page';
var AmbulancePage = /** @class */ (function () {
    function AmbulancePage(navCtrl, database, modalCtrl, storage, loadingController, api, auth, callNumber, geolocation) {
        this.navCtrl = navCtrl;
        this.database = database;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.loadingController = loadingController;
        this.api = api;
        this.auth = auth;
        this.callNumber = callNumber;
        this.geolocation = geolocation;
        this.latitude = 0;
        this.longitude = 0;
        this.pais_selected = {
            name: "Peru",
            dial_code: "+51",
            code: "PE"
        };
        this.directionsService = new google.maps.DirectionsService();
    }
    AmbulancePage.prototype.ngOnInit = function () {
        this.form = new FormGroup({
            phone_number: new FormControl('', [Validators.required]),
            address: new FormControl('', [Validators.required])
        });
        this.InitMap();
    };
    AmbulancePage.prototype.goHome = function () {
        this.navCtrl.navigateRoot('home');
    };
    AmbulancePage.prototype.InitMap = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: 'Hellooo'
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        this.geolocation.getCurrentPosition().then(function (resp) {
                            loading.dismiss();
                            var location = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
                            var options = {
                                center: location,
                                zoom: 15,
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
                            _this.map = new google.maps.Map(_this.mapRef.nativeElement, options);
                            google.maps.event.addListener(_this.map, 'idle', function () {
                                var location = _this.map.getCenter();
                                _this.latitude = location.lat();
                                _this.longitude = location.lng();
                                var request = {
                                    origin: location,
                                    destination: location,
                                    travelMode: google.maps.TravelMode.WALKING
                                };
                                var placesService = new google.maps.places.PlacesService(_this.map);
                                _this.directionsService.route(request, function (result, status) {
                                    if (status == google.maps.DirectionsStatus.OK) {
                                        var d = result.routes[0].legs[0].start_address;
                                        var d_list = d.split(" ");
                                        ;
                                        var _direccion = "";
                                        for (var _i = 0, d_list_1 = d_list; _i < d_list_1.length; _i++) {
                                            var letter = d_list_1[_i];
                                            if (letter != "Cusco," && letter != "Perú" && letter != "Cusco" && letter != "08000" && letter != "08000,") {
                                                _direccion = _direccion + letter + " ";
                                            }
                                        }
                                        if (_direccion.charAt(_direccion.length - 2) == ",") {
                                            _this.form.controls["address"].setValue(_direccion.substring(0, _direccion.length - 2));
                                        }
                                    }
                                });
                            });
                        }, function (error) {
                            loading.dismiss();
                            console.log('Error getting location', error);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    AmbulancePage.prototype.getCurrentLocation = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: 'Buscando su ubicación ...'
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        this.geolocation.getCurrentPosition().then(function (position) {
                            loading.dismiss().then(function () {
                                var lat = position.coords.latitude;
                                var lng = position.coords.longitude;
                                var location = new google.maps.LatLng(lat, lng);
                                _this.map.setZoom(17);
                                _this.map.panTo(location);
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    AmbulancePage.prototype.goConfirmAmbulance = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading, value;
            var _this = this;
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
                        value = this.form.value;
                        this.storage.getValue("uid").then(function (id) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return tslib_1.__generator(this, function (_a) {
                                this.storage.getValue("token_id").then(function (token_id) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    var data, push_data;
                                    var _this = this;
                                    return tslib_1.__generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                data = {
                                                    id: id,
                                                    token_id: token_id,
                                                    phone_number: value.phone_number,
                                                    address: value.address,
                                                    latitude: this.latitude,
                                                    longitude: this.longitude,
                                                    date: new Date().toISOString(),
                                                    ambulance_ori_lat: 0,
                                                    ambulance_ori_lon: 0,
                                                    who_canceled: '',
                                                    why_canceled: '',
                                                    ambulance_id: '',
                                                    driver_id: '',
                                                    admi_id: '',
                                                    admi_name: '',
                                                    state: 'created',
                                                    user_fullname: this.auth.user.fullname,
                                                    user_email: this.auth.user.email,
                                                    country_name: this.pais_selected.name,
                                                    country_dial_code: this.pais_selected.dial_code,
                                                    country_code: this.pais_selected.code,
                                                };
                                                return [4 /*yield*/, this.database.addSendAmbulance(data, data.id)];
                                            case 1:
                                                _a.sent();
                                                push_data = {
                                                    titulo: 'Emergencia en progreso',
                                                    detalle: 'Una solicitud de ambulancia fue creada',
                                                    destino: 'ambulance-check',
                                                    mode: 'tags',
                                                    clave: data.id,
                                                    tokens: 'Administrador,Admision'
                                                };
                                                this.api.pushNotification(push_data).subscribe(function (response) {
                                                    console.log("Notificacion Enviada...", response);
                                                    loading.dismiss();
                                                    _this.goHome();
                                                }, function (error) {
                                                    console.log("Notificacion Error...", error);
                                                    loading.dismiss();
                                                    _this.goHome();
                                                });
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                                return [2 /*return*/];
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    AmbulancePage.prototype.callNow = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: 'Procesando ...'
                        })];
                    case 1:
                        loading = _a.sent();
                        loading.present();
                        this.callNumber.callNumber("+51989316622", true)
                            .then(function (res) {
                            loading.dismiss();
                        })
                            .catch(function (err) {
                            loading.dismiss();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    AmbulancePage.prototype.getFlat = function () {
        return "https://www.countryflags.io/" + this.pais_selected.code + "/flat/24.png";
    };
    AmbulancePage.prototype.select_code = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: SelectCountriesPage,
                            mode: 'ios',
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (response) {
                            if (response.role == 'response') {
                                _this.pais_selected = response.data;
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    tslib_1.__decorate([
        ViewChild('map'),
        tslib_1.__metadata("design:type", ElementRef)
    ], AmbulancePage.prototype, "mapRef", void 0);
    AmbulancePage = tslib_1.__decorate([
        Component({
            selector: 'app-ambulance',
            templateUrl: './ambulance.page.html',
            styleUrls: ['./ambulance.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            DatabaseService,
            ModalController,
            StorageService,
            LoadingController,
            ApiService,
            AuthService,
            CallNumber,
            Geolocation])
    ], AmbulancePage);
    return AmbulancePage;
}());
export { AmbulancePage };
//# sourceMappingURL=ambulance.page.js.map