import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {EnterpriseService} from '../../services/enterprise.service';

@Component({
  selector: 'app-enterprise-search',
  templateUrl: './enterprise-search.component.html',
  styleUrls: ['./enterprise-search.component.css']
})
export class EnterpriseSearchComponent implements OnInit {
  searchText: string;
  @Output() searchEnterprises = new EventEmitter<string>();

  constructor() {

  }

  ngOnInit() {
  }


}
