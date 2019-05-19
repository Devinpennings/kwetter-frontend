import {Component, OnInit} from '@angular/core';
import {AuthService} from './shared/services/auth.service';
import {SocketService} from './shared/services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private socketService: SocketService,
  ) {}



  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  ngOnInit(): void {

    if (this.authService.getUser() != null) {
      this.socketService.connect(this.authService.getUser().id);
    }

    this.authService.getUserAsObservable().subscribe(user => {
      if (user) {
        this.socketService.connect(user.id);
      } else {
        this.socketService.close();
      }
    });

  }

}
