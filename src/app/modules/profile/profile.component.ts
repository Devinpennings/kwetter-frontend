import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {User} from '../../shared/models/user';
import {UserService} from '../../shared/services/user.service';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  isLoading: boolean;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.fetchUser();
  }

  fetchUser(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id == null) {
      id = this.authService.getInfo().sub;
    }

    this.userService.get(id)
      .subscribe(user => {
        this.isLoading = false;
        this.user = user;
      });
  }

}
