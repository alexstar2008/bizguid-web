import {Component, OnInit, Input} from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {EnterpriseService} from '../enterprise.service';
import {EnterpriseFull} from '../enterprise-full';

@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.css']
})

export class EnterpriseComponent implements OnInit {
  @Input() enterprise: EnterpriseFull;

  constructor(private route: ActivatedRoute, private enterpriseService: EnterpriseService) {
  }

  ngOnInit() {
    this.getEnterprise();
  }

  getEnterprise() {
    const slug = this.route.snapshot.params.slug;
    this.enterpriseService.getSingleEntrprise(slug).subscribe((enterprise) => {
      this.enterprise = enterprise;
    });
  }
}
