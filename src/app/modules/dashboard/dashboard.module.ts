import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {DashboardTimelineComponent} from './components/dashboard-timeline/dashboard-timeline.component';
import {DashboardUpdateComponent} from './components/dashboard-update/dashboard-update.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    DashboardTimelineComponent,
    DashboardUpdateComponent
  ],
})
export class DashboardModule { }
