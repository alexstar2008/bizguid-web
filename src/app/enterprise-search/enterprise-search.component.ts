import {Component, OnInit} from '@angular/core';
import {EnterpriseService} from '../enterprise.service';

@Component({
  selector: 'app-enterprise-search',
  templateUrl: './enterprise-search.component.html',
  styleUrls: ['./enterprise-search.component.css']
})
export class EnterpriseSearchComponent implements OnInit {

  constructor(private enterpriseService: EnterpriseService) {

  }

  ngOnInit() {
  }



}
