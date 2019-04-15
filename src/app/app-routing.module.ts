import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './shared/guards/AuthGuard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'dashboard', loadChildren: './modules/dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard] },
  { path: 'profile', loadChildren: './modules/profile/profile.module#ProfileModule', canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
