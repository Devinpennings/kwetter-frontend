import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../shared/models/user';

@Component({
  selector: 'app-profile-following',
  templateUrl: './profile-following.component.html',
  styleUrls: ['./profile-following.component.scss']
})
export class ProfileFollowingComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit() {

  }

}
