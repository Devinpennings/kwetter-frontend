import {Component, OnInit} from '@angular/core';
import {AuthService} from './shared/services/auth.service';
import {SocketService} from './shared/services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private socketService: SocketService,
  ) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

}
