import { Component, OnInit, Input, NgZone } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';

import { ActivatedRoute } from '@angular/router';
import { EnterpriseService } from '../../services/enterprise.service';
import { EnterpriseFull } from '../../schemas/enterprise-full';
import { GoogleMapsService } from "../../services/google-maps/google-maps.service";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { PaymentComponent } from '../payment/payment.component';
import { AdditionalInfoComponent } from '../additional-info/additional-info.component';

class Map {
  lat: any;
  lng: any;
}

/* TODO: change to BACKEND */
class EnterpriseAdditional {
  regions: object;
  categories: object;
}

@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.css']
})

export class EnterpriseComponent implements OnInit {
  enterprise: EnterpriseFull;
  enterpriseAdditional: EnterpriseAdditional;
  map: Map;

  constructor(private route: ActivatedRoute,
    private enterpriseService: EnterpriseService,
    private googleMapsService: GoogleMapsService,
    private sanitizer: DomSanitizer,
    private __zone: NgZone,
    private dialogService: DialogService) {

  }

  ngOnInit() {
    this.getEnterprise();
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustHtml(url);
  }
  getMap(address: string) {
    this.googleMapsService.getLatLng(address).subscribe((data) => {
      this.__zone.run(() => {
        this.map = {
          lat: data.lat(),
          lng: data.lng()
        };
      });
    }, (err) => console.log(err));
  }

  getEnterprise(): void {
    const slug = this.route.snapshot.params.slug;
    this.enterpriseService.getSingleEnterprise(slug).subscribe((enterprise) => {
      this.enterprise = enterprise;
      this.getMap(enterprise.address || enterprise.postAddress);
      this.getEnterpriseAdditionData();
    });
  }

  showPaymentModal(event): void {
    event.preventDefault();
    let disposable = this.dialogService.addDialog(PaymentComponent, {
      title: 'Test',
      price: 10
    }).subscribe((result) => {
      console.log(result);
    });
  }
  showAdditionalInfoModal(event): void {
    event.preventDefault();
    let disposable = this.dialogService.addDialog(AdditionalInfoComponent, {
      title: 'Test',
      price: 10
    }).subscribe((result) => {
      console.log(result);
    });
  }
  // TODO: move to backend
  getEnterpriseAdditionData(): void {
    const categories = this.enterprise.categoriesId;
    let resRegions = [];
    if (this.enterprise.exportRegionsID) {
      resRegions = resRegions.concat(this.enterprise.exportRegionsID);
    }
    if (this.enterprise.importRegionsId) {
      resRegions = resRegions.concat(this.enterprise.importRegionsId);
    }
    this.enterpriseService.getAdditionalInfoByIds(categories, resRegions).subscribe((data) => {
      const regions = {};
      const categories = {};

      for (let value of data.regions) {
        regions[value._id] = value.name;
      }
      for (let value of data.categories) {
        categories[value._id] = value.name;
      }
      console.log(resRegions);
      this.enterpriseAdditional = { regions, categories };
    });
  }
}
