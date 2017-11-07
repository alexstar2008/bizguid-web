import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EnterprisesListComponent} from './enterprises-list/enterprises-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/search', pathMatch: 'full'},
  {path: 'search', component: EnterprisesListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}