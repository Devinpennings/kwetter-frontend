import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/models/user';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private user: User;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

}
