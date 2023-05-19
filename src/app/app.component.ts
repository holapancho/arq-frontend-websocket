import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from './service/websocket.service';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  mapsLoaded: Observable<boolean>;
  @ViewChild('myGoogleMap', { static: false })
  map!: GoogleMap;
  markers = [] as any;
  ubicacion = { lat: -32.98, lng: -71.27 }
  options: google.maps.MapOptions = {
    center: this.ubicacion,
    zoom: 15
  };

  ultimaUbicacion = "Cargando...";
  ultimaActualizacion = "Cargando...";

  constructor(private httpClient: HttpClient, private websocketService: WebsocketService) {
    this.mapsLoaded = httpClient
      .jsonp(
        `https://maps.googleapis.com/maps/api/js?key=API_KEY`,
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
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
    const position = {
      lat: event.latitud,
      lng: event.longitud,
    };
    this.markers.push({
      position,
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    })
    if (this.markers.length > 1) {
      this.markers.shift();
    }
    this.ubicacion = position;
    this.ultimaUbicacion = `Ultima ubicación: Latitud ${position.lat} - Longitud ${position.lng}`;
    this.ultimaActualizacion = `Ultima actualizacion: ${new Date().toLocaleString()}`;
  }

}
