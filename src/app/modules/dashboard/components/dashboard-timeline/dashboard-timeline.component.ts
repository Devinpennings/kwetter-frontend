import {Component, OnInit} from '@angular/core';
import {Kweet} from '../../../../shared/models/kweet';
import {AuthService} from '../../../../shared/services/auth.service';
import {KweetService} from '../../../../shared/services/kweet.service';

@Component({
  selector: 'app-dashboard-timeline',
  templateUrl: './dashboard-timeline.component.html',
  styleUrls: ['./dashboard-timeline.component.scss']
})
export class DashboardTimelineComponent implements OnInit {
  timeline: Kweet[];
  isLoading: boolean;

  constructor(
    private authService: AuthService,
    private kweetService: KweetService
  ) {
    this.isLoading = true;
  }

  ngOnInit() {
    this.refresh();
    this.kweetService.updatedTimeline.subscribe(() => {
      this.refresh();
    });
  }

  refresh() {
    this.isLoading = true;
    this.kweetService.getTimeline().subscribe(result => {
      this.timeline = result;
    });
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

}
