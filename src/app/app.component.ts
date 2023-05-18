import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from './service/websocket.service';
import { GoogleMap, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  @ViewChild('myGoogleMap', { static: false })
  map!: GoogleMap;

  markers = [] as any;

  ubicacion = { lat: -32.98, lng: -71.27 }

  options: google.maps.MapOptions = {
    center: this.ubicacion,
    zoom: 15
  };


  constructor(private websocketService: WebsocketService) {

  }

  ngOnInit(): void {
    this.websocketService.connect();
    this.websocketService.posicionStatus.subscribe(posicion => {
      console.log(posicion);
      if (posicion.latitud && posicion.longitud) {
        this.ponerMarker(posicion)
      }
    })
  }

  ponerMarker(event: any) {
    this.markers.push({
      position: {
        lat: event.latitud,
        lng: event.longitud,
      },
      label: {
        color: 'blue',
        text: 'Marker label ',
      },
      title: 'Marker title ',
      info: 'Marker info ',
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    })
  }
  openInfo(marker: MapMarker, content: string) {
    console.log(content);
  }

}
