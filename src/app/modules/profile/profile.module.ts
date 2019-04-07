import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import {BasicProfileComponent} from './components/basic-profile/basic-profile.component';
import {ProfileDetailsComponent} from './components/profile-details/profile-details.component';
import {ProfileFollowersComponent} from './components/profile-followers/profile-followers.component';
import {ProfileFollowingComponent} from './components/profile-following/profile-following.component';
import {ProfileKweetsComponent} from './components/profile-kweets/profile-kweets.component';
import {en_US, NgZorroAntdModule, NZ_I18N} from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NgZorroAntdModule,
  ],
  declarations: [
    ProfileComponent,
    BasicProfileComponent,
    ProfileDetailsComponent,
    ProfileFollowersComponent,
    ProfileFollowingComponent,
    ProfileKweetsComponent,
  ]
})
export class ProfileModule { }
