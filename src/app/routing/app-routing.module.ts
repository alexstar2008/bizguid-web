import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EnterprisesListComponent} from '../components/enterprises-list/enterprises-list.component';
import {EnterpriseComponent} from '../components/enterprise/enterprise.component';

const routes: Routes = [
  {path: '', redirectTo: '/search', pathMatch: 'full'},
  {path: 'search', component: EnterprisesListComponent},
  {path: 'enterprise/:slug', component: EnterpriseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
