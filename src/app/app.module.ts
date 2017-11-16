import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './routing/app-routing.module';
import {EnterpriseService} from './services/enterprise.service';
import {EnterprisesListComponent} from './components/enterprises-list/enterprises-list.component';
import {EnterpriseComponent} from './components/enterprise/enterprise.component';
import {EnterpriseSearchComponent} from './components/enterprise-search/enterprise-search.component';
import {PaginationComponent} from './components/pagination/pagination.component';

import {LoadingModule} from 'ngx-loading';

@NgModule({
  declarations: [AppComponent, EnterprisesListComponent, EnterpriseComponent, EnterpriseSearchComponent, PaginationComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule, LoadingModule],
  providers: [EnterpriseService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
