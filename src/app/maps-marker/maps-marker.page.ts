import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;
import { GeneralService } from 'src/app/general-service/general.service';
import { GoogleMapsService } from '../google-maps.service';

declare var google:any;

@Component({
  selector: 'app-maps-marker',
  templateUrl: './maps-marker.page.html',
  styleUrls: ['./maps-marker.page.scss'],
})
export class MapsMarkerPage implements OnInit {
  @ViewChild('map', {static: true}) private mapElement: ElementRef;

  projectId:number;
  maintenanceConstructions = [];

  mapInitialized: boolean;
  GPS:any;
  markerMe:any;
  constructionMarkers = [];

  constructor(
    private route:ActivatedRoute,
    private router: Router,
    private maps:GoogleMapsService,
    private general:GeneralService) { }

  ngOnInit() {
    this.projectId = +this.route.snapshot.paramMap.get('id');
    this.general.getMaintenanceConstructionList(this.projectId).subscribe((res:any) => this.loadMaintenanceConstructions(res));
  }


  loadMaintenanceConstructions(results:any) {
    this.maintenanceConstructions = results.result;

    if (!this.mapInitialized) {
      let mapLoaded = this.maps.init(this.mapElement.nativeElement).then(() => {
        this.mapInitialized = true;
      }).catch(err => console.log(err));
      mapLoaded.catch(err => console.log(err));
    }

    this.mapsMarkers();

    console.log('Maintenance Construction Results', results);
  }

  async mapsMarkers() {
    let $this = this;
    this.GPS = await Geolocation.getCurrentPosition();

    if(this.maps.map) {
      let center = new google.maps.LatLng(this.GPS.coords.latitude, this.GPS.coords.longitude);


      if (this.markerMe) {
        this.markerMe.setPosition(center);
      } else {
        this.markerMe = new google.maps.Marker({
          position: center,
          map: this.maps.map,
        });
      }

      for (let i = 0; i < this.maintenanceConstructions.length; i++) {
        const construction = this.maintenanceConstructions[i];
        let markerCenter = new google.maps.LatLng(construction.const_latitude, construction.const_longitude),
          marker = new google.maps.Marker({
            position: markerCenter,
            map: this.maps.map,
        });

        marker.addListener('click', function() {
          $this.markerClick(construction.construction_id, construction.construction_number);
        })
        this.constructionMarkers.push(marker);
      }


      setTimeout(() => {
        this.maps.map.panTo(center);
      }, 1000);

    } else {
      console.warn('maps.map is not there, Retrying ....');
      setTimeout(() => {
        this.mapsMarkers();
      }, 500);
    }
  }

  markerClick(constructionId:number, constructionNumber:number) {
    this.router.navigate(['/construction/begin-construction']);
    this.general.constructionID = constructionId;
    this.general.constructionNumber = constructionNumber;
  }

}
