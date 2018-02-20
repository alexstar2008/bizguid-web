import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { EnterpriseService } from './services/enterprise.service';
import { GoogleMapsService } from './services/google-maps/google-maps.service';
import { EnterprisesListComponent } from './components/enterprises-list/enterprises-list.component';
import { EnterpriseComponent } from './components/enterprise/enterprise.component';
import { EnterpriseSearchComponent } from './components/enterprise-search/enterprise-search.component';
import { PaginationComponent } from './components/pagination/pagination.component';

import { AgmCoreModule } from '@agm/core';

import { LoadingModule } from 'ngx-loading';
import { PaymentComponent } from './components/payment/payment.component';
import { AdditionalInfoComponent } from './components/additional-info/additional-info.component';
@NgModule({
  declarations: [AppComponent, EnterprisesListComponent, EnterpriseComponent, EnterpriseSearchComponent, PaginationComponent, PaymentComponent, AdditionalInfoComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule, LoadingModule, BootstrapModalModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBSO079I6VEMPSjdf7T-2V0itGZC2fcEU8' })],
  providers: [EnterpriseService, GoogleMapsService],
  entryComponents: [PaymentComponent, AdditionalInfoComponent],
  bootstrap: [AppComponent]
})

export class AppModule {
}
