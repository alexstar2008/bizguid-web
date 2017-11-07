import {Component, OnInit} from '@angular/core';
import {EnterpriseService} from './enterprise.service';
import {EnterpiseShort} from './enterpise-short';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  enterprises: EnterpiseShort[];

  constructor(private enterpriseService: EnterpriseService) {

  }

  ngOnInit() {
    this.getEnterprises();
  }

  getEnterprises() {
    this.enterpriseService.getAllEnterprises().subscribe(enterp => {
      this.enterprises = enterp;
      console.log(this.enterprises);
    });
  }
}
