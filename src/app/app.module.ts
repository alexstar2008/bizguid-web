import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {EnterpriseService} from './enterprise.service';
import {EnterprisesListComponent} from './enterprises-list/enterprises-list.component';



@NgModule({
  declarations: [AppComponent, EnterprisesListComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  providers: [EnterpriseService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
