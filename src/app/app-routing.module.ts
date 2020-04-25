import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HubCreateComponent } from './components/hub-create/hub-create.component'
import { HubListComponent } from './components/hub-list/hub-list.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'hub-create' },
  { path: 'hub-create', component: HubCreateComponent },
  { path: 'hub-list', component: HubListComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
