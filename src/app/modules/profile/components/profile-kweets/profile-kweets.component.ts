import {Component, Input, OnInit} from '@angular/core';
import {Kweet} from '../../../../shared/models/kweet';

@Component({
  selector: 'app-profile-kweets',
  templateUrl: './profile-kweets.component.html',
  styleUrls: ['./profile-kweets.component.scss']
})
export class ProfileKweetsComponent implements OnInit {

  @Input() kweets: Kweet[];

  constructor() { }

  ngOnInit() {
  }

}
