import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() {

  }


  public connect(): void {
    //this.client.activate();
    const subject = webSocket('ws://host.docker.internal:8090/ws');

    subject.subscribe({
      next: msg => console.log(msg), // Called whenever there is a message from the server.
      error: err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
    });

  }

}
