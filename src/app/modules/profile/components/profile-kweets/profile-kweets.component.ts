import {Component, Input, OnInit} from '@angular/core';
import {Kweet} from '../../../../shared/models/kweet';
import {User} from '../../../../shared/models/user';
import {KweetService} from '../../../../shared/services/kweet.service';

@Component({
  selector: 'app-profile-kweets',
  templateUrl: './profile-kweets.component.html',
  styleUrls: ['./profile-kweets.component.scss']
})
export class ProfileKweetsComponent implements OnInit {

  @Input() user: User;
  kweets: Kweet[];

  constructor(
    private kweetService: KweetService
  ) { }

  ngOnInit() {
    this.kweetService.getByUser(this.user.id).subscribe(result => {
      this.kweets = result;
    });
  }

}
