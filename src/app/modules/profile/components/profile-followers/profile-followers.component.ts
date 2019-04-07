import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../shared/models/user';

@Component({
  selector: 'app-profile-followers',
  templateUrl: './profile-followers.component.html',
  styleUrls: ['./profile-followers.component.scss']
})
export class ProfileFollowersComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
