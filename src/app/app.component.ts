import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(private websocketService: WebsocketService) {
    this.websocketService.connect();
  }

  ngOnInit(): void {
  }


}
