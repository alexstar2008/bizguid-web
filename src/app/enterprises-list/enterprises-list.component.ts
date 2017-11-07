import {Component, OnInit} from '@angular/core';

import {EnterpriseService} from '../enterprise.service';
import {EnterpiseShort} from '../enterpise-short';

@Component({
  selector: 'app-enterprises-list',
  templateUrl: './enterprises-list.component.html',
  styleUrls: ['./enterprises-list.component.css']
})
export class EnterprisesListComponent implements OnInit {
  enterprises: EnterpiseShort[];

  constructor(private enterpriseService: EnterpriseService) {

  }

  ngOnInit() {
    this.getEnterprises();
  }

  getEnterprises() {
    this.enterpriseService.getAllEnterprises().subscribe(enterprises => {
      this.enterprises = enterprises;
    });
  }

}
