import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppartmentsComponent } from './components/appartments/appartments.component';
import { DevicesComponent } from './components/devices/devices.component';
import { LivingareaComponent } from './components/livingarea/livingarea.component';
import { OfficesComponent } from './components/offices/offices.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { SidebarcenterComponent } from './layout/pages/sidebarcenter/sidebarcenter.component';

const routes: Routes = [
  {
    path: 'apartment',
    component: AppartmentsComponent,
  },
  { path: 'office', component: OfficesComponent },

  { path: 'devices/:id', component: DevicesComponent },

  // { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
