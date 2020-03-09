import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;
import { GeneralService } from 'src/app/general-service/general.service';
import { GoogleMapsService } from '../google-maps.service';

import * as _ from 'lodash';

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
  completeConstructionList = [];

  mapInitialized: boolean;
  GPS:any;
  markerMe:any;
  constructionMarkers = [];

  constructor(
    private route:ActivatedRoute,
    private router: Router,
    private maps:GoogleMapsService,
    public general:GeneralService) { }

  ngOnInit() {
    this.projectId = +this.route.snapshot.paramMap.get('id');
    this.general.loadsheetData.project_id = this.projectId;
    this.general.getMaintenanceConstructionList(this.projectId).subscribe((res:any) => this.loadMaintenanceConstructions(res));
    this.general.getCompletedConstructionList(this.projectId).subscribe((res:any) => this.completeConstructionList = res.result.result);
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
            icon:"../../assets/imgs/NEW-Amalooloo-App-Location-Icon-20200203@4x.png"
        });

        marker.addListener('click', function() {
          $this.markerClick(construction.construction_id,construction.const_latitude,construction.const_longitude);
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

  markerClick(constructionId:number,lat:any,long:any) {

    this.general.navLat = lat;
    this.general.navlong = long;

    this.router.navigate(['/construction/begin-construction']);
    let construction = _.filter(this.completeConstructionList, ['id', constructionId])[0];
    this.general.constructionID = constructionId;
    this.general.constructionNumber = construction.const_no;
    this.general.loadsheetData.construction_id = constructionId;
    this.general.loadsheetData.beneficiary_details.name = construction.beneficiary_name;
    this.general.loadsheetData.beneficiary_details.surname = construction.beneficiary_surname;
    this.general.loadsheetData.construction_address = construction.const_address;
    this.general.loadsheetData.beneficiary_id = construction.beneficiary_id_no;
    this.general.loadsheetData.beneficiary_stand_no = construction.beneficiary_stand_no;

    console.log("Construction Detail", construction);
  }

}
