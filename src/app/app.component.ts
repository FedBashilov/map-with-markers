import { Component, AfterViewInit} from '@angular/core';

import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'leaflet-map';
  private map;
  private markers: Array<L.marker> = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3,
      layers: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    });

  this.map.on('moveend', () => {
    this.renderMarkers();
  });
  }


  renderMarkers(): void{
    let amount: number = parseInt((<HTMLInputElement>document.getElementsByClassName("amount_input")[0]).value);
    let bounds = this.map.getBounds();
    this.clearMap();
    for (let i = 0; i < amount; i++) {
      this.makeMarker(this.map, bounds);
    }

  }

  clearMap(): void{
    this.markers.forEach(marker => {
      this.map.removeLayer(marker);
    });
    this.markers = [];
  }

  makeMarker(map: L.map, bounds): void {
    let randomLat = this.getRandomFloat(bounds._southWest.lat, bounds._northEast.lat),
        randomLng = this.getRandomFloat(bounds._southWest.lng, bounds._northEast.lng);
    let marker = L.marker([randomLat, randomLng], {icon: this.generateIcon()}).addTo(map);
    this.markers.push(marker);
  }

  getRandomFloat(min, max) {
    return (Math.random() * (max - min) + min);
  }

  getRandomInteger(min, max): number {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  generateIcon(): L.icon{
    let outerIcons: Array<string> = ['drop.svg', 'pickup.svg'];
    let innerIcons: Array<string> = ['barbell.svg', 'bowl.svg', 'bus.svg',
    'circle_heart.svg', 'circle_star.svg',
    'diamond.svg', 'dollar.svg', 'food.svg'];

    let myIcon = L.icon({
        iconUrl: 'assets/inner_icons/'+ innerIcons[this.getRandomInteger(0, innerIcons.length-1)],
        shadowUrl: 'assets/outer_icons/'+ outerIcons[this.getRandomInteger(0, outerIcons.length-1)],
        iconSize:     [38, 95],
        shadowSize:   [50, 64],
        iconAnchor:   [0, 70],
        shadowAnchor: [5, 52],
        popupAnchor:  [0, 0]
    });
    return myIcon;
  }
}
