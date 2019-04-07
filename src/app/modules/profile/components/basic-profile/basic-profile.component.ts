import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../shared/models/user';

@Component({
  selector: 'app-basic-profile',
  templateUrl: './basic-profile.component.html',
  styleUrls: ['./basic-profile.component.scss']
})
export class BasicProfileComponent implements OnInit, AfterViewInit {

  @Input() user: User;
  isLoading: boolean;

  constructor() {
    this.isLoading = true;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

    setTimeout(() => {
      this.isLoading = false;
    }, 1000);

  }
}
