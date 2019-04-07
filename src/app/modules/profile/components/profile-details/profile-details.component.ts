import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../shared/models/user';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }
}
