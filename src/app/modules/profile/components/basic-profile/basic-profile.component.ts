import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../shared/models/user';
import {AuthService} from '../../../../shared/services/auth.service';
import {UserService} from '../../../../shared/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-basic-profile',
  templateUrl: './basic-profile.component.html',
  styleUrls: ['./basic-profile.component.scss']
})
export class BasicProfileComponent implements OnInit, AfterViewInit {

  @Input() user: User;
  isLoading: boolean;
  isSubmittingFollowing: boolean;
  isSelf: boolean;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.isLoading = true;
    this.isSubmittingFollowing = false;
    this.isSelf = true;
  }

  ngOnInit() {
    this.isSelf = this.authService.getUser().id === this.user.id;
  }

  ngAfterViewInit() {

    setTimeout(() => {
      this.isLoading = false;
    }, 1000);

  }

  isFollowing(): boolean {
    return this.user.followers.some(u => u.id === this.authService.getUser().id);
  }

  toggleFollow() {
    this.isSubmittingFollowing = true;
    this.userService.toggleFollow(this.user).subscribe(result => {
      setTimeout(() => {
        this.user = result;
        console.log(this.user);
        this.isSubmittingFollowing = false;
      }, 1000);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['auth']);
  }
}
