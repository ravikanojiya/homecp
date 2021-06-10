import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppartmentsComponent } from './components/appartments/appartments.component';
import { LivingareaComponent } from './components/livingarea/livingarea.component';
import { OfficesComponent } from './components/offices/offices.component';

const routes: Routes = [
  { path: 'appartment', component: AppartmentsComponent },
  { path: 'office', component: OfficesComponent },
  { path: 'living/:id', component: LivingareaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
