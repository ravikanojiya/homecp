import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from '../auth/auth.module';
import { ChangepwdComponent } from './changepwd/changepwd.component';
import { HomeComponent } from './home/home.component';

import { UsersComponent } from './users.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'changepwd', component: ChangepwdComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
