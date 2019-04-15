import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
    private router: Router,
    private location: Location,
    private userService: UserService,
    private authService: AuthService
  ) {
    route.params.subscribe(() => {
      this.fetchUser();
    });
  }

  ngOnInit() {
  }

  fetchUser(): void {
    this.isLoading = true;
    let id = this.route.snapshot.paramMap.get('id');

    if (id == null) {
      id = this.authService.getInfo().sub;
    }

    if (id == null) {
      this.router.navigate(['/']);
    }

    this.userService.get(id)
      .subscribe(user => {
        this.isLoading = false;
        this.user = user;
      });
  }

}
