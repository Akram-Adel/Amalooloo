import { Injectable } from '@angular/core';

declare var google:any;

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  googleApiKey:string = 'AIzaSyDpzFm0JwSmVUbSHVJxsngbxRcm9vreGcI';

  mapElement: any;
  map: any;
  mapInitialised: boolean = false;

  constructor() { }

  init(mapElement: any): Promise<any> {
    this.mapElement = mapElement;
    return this.loadGoogleMaps();
  }

  loadGoogleMaps(): Promise<any> {
    return new Promise((resolve) => {
      if (typeof google == "undefined" || typeof google.maps == "undefined") {
        console.log("Google maps JavaScript needs to be loaded.");
        window['mapInit'] = () => {
          this.initMap().then(() => {
            resolve(true);
          });
        }

        let script = document.createElement("script");
        script.id = "googleMaps";
        if (this.googleApiKey) {
          script.src = 'http://maps.google.com/maps/api/js?key=' + this.googleApiKey + '&callback=mapInit&libraries=places';
        } else {
          script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
        }
        document.body.appendChild(script);

      } else {
        this.initMap();
        resolve(true);
      }
    });
  }

  initMap(): Promise<any> {
    this.mapInitialised = true;
    return new Promise((resolve) => {
      let latLng = new google.maps.LatLng(-29.542329, 24.342110);
      let mapOptions = {
        center: latLng,
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement, mapOptions);
      resolve(true);
    });
  }

}
