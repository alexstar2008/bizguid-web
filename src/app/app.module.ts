import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {EnterpriseService} from './enterprise.service';
import {EnterprisesListComponent} from './enterprises-list/enterprises-list.component';
import { EnterpriseComponent } from './enterprise/enterprise.component';
import { EnterpriseSearchComponent } from './enterprise-search/enterprise-search.component';
import { PaginationComponent } from './pagination/pagination.component';



@NgModule({
  declarations: [AppComponent, EnterprisesListComponent, EnterpriseComponent, EnterpriseSearchComponent, PaginationComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  providers: [EnterpriseService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
