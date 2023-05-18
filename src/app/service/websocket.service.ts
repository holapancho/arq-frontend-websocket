import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { Posicion } from '../model/posicion.model';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private posicion = new BehaviorSubject<Posicion>({} as Posicion);
  public posicionStatus = this.posicion.asObservable();

  constructor() {
  }


  public connect(): void {
    const subject = webSocket('ws://host.docker.internal:8090/ws');

    subject.subscribe({
      next: (msg : any) => {
       this.posicion.next(new Posicion(Number(msg.latitud),Number(msg.longitud)))

      }, // Called whenever there is a message from the server.
      error: err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
    });

  }

}
