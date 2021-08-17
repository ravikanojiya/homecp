import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AppartmentsComponent } from './components/appartments/appartments.component';
import { DevicesComponent } from './components/devices/devices.component';
import { LivingareaComponent } from './components/livingarea/livingarea.component';
import { OfficesComponent } from './components/offices/offices.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { SidebarcenterComponent } from './layout/pages/sidebarcenter/sidebarcenter.component';
import { HomeComponent } from './users/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'apartment',
    component: AppartmentsComponent,
    canActivate: [AuthModule],
  },
  { path: 'office', component: OfficesComponent, canActivate: [AuthModule] },

  {
    path: 'devices/:id',
    component: DevicesComponent,
    canActivate: [AuthModule],
  },

  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  // { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
