import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { SidebarcenterComponent } from '../layout/pages/sidebarcenter/sidebarcenter.component';
import { SidebarleftComponent } from '../layout/pages/sidebarleft/sidebarleft.component';
import { SidebarrightComponent } from '../layout/pages/sidebarright/sidebarright.component';
import { FooterComponent } from '../layout/pages/footer/footer.component';
import { AppartmentsComponent } from '../components/appartments/appartments.component';
import { DevicesComponent } from '../components/devices/devices.component';
import { LivingareaComponent } from '../components/livingarea/livingarea.component';
import { OfficesComponent } from '../components/offices/offices.component';
import { RoomlistComponent } from '../components/roomlist/roomlist.component';
import { RoomsComponent } from '../components/rooms/rooms.component';
import { ChangepwdComponent } from './changepwd/changepwd.component';

@NgModule({
  declarations: [
    UsersComponent,
    HomeComponent,
    FooterComponent,
    AppartmentsComponent,
    OfficesComponent,
    LivingareaComponent,
    SidebarleftComponent,
    SidebarrightComponent,
    SidebarcenterComponent,
    RoomsComponent,
    DevicesComponent,
    FooterComponent,
    RoomlistComponent,
    ChangepwdComponent,
  ],
  imports: [CommonModule, SharedModule, UsersRoutingModule,],
})
export class UsersModule {}
