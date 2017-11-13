import {Component, OnInit} from '@angular/core';

import {EnterpriseService} from '../../services/enterprise.service';
import {EnterpiseShort} from '../../schemas/enterpise-short';
import {Region} from '../../schemas/region';
import {Category} from '../../schemas/category';

@Component({
  selector: 'app-enterprises-list',
  templateUrl: './enterprises-list.component.html',
  styleUrls: ['./enterprises-list.component.css']
})
export class EnterprisesListComponent implements OnInit {
  enterprises: EnterpiseShort[];
  regions: Region[];
  categories: Category[];

  // search
  regionsChosed = [];
  categoriesChosed = [];
  searchText: string;

  // pagination
  totalItems = 100;
  page = 1;
  amountPerPage = 25;

  // TODO: FIX HARDCODE SECTION
  searchType = 'all';


  constructor(private enterpriseService: EnterpriseService) {

  }

  ngOnInit() {
    this.getEnterprises();
    this.getRegionList();
    this.getCategoriesList();
  }

  matchingSearchType(): void {
    switch (this.searchType) {
      case 'all':
        this.getEnterprises();
        break;
      case 'categories':
        this.searchEnterprisesByCategories();
        break;
      case 'text':
        this.searchEnterprises();
        break;
      default:
        break;
    }
  }

  // Pagination
  onPrev(): void {
    if (this.page > 1) {
      this.page--;
    }
    this.matchingSearchType();
  }

  onNext(): void {
    this.page++;
    this.matchingSearchType();
  }

  onPage(page: number): void {
    this.page = page;
    this.matchingSearchType();
  }

  // GET
  getEnterprises(): void {
    const offset = (this.page - 1) * this.amountPerPage;
    this.enterpriseService.getAllEnterprises(offset, this.amountPerPage).subscribe((resp) => {
      this.totalItems = +resp.headers.get('X-Total-Count');
      this.enterprises = <EnterpiseShort[]>resp.body;
      this.searchType = 'all';
    });
  }

  searchEnterprises(): void {
    const offset = (this.page - 1) * this.amountPerPage;
    this.enterpriseService.searchEnterprisesByText(this.searchText, offset, this.amountPerPage).subscribe((resp) => {
      this.totalItems = +resp.headers.get('X-Total-Count');
      this.enterprises = <EnterpiseShort[]>resp.body;
      this.searchType = 'text';
    });
  }

  toggleSelectedRegion(region): void {
    const id = region._id;
    if (!(this.regionsChosed.includes(id))) {
      this.regionsChosed.push(id);
    } else {
      this.regionsChosed.splice(this.regionsChosed.indexOf(id), 1);
    }
    this.searchEnterprisesByCategories();
  }

  toggleSelectedCategory(category): void {
    const id = category._id;
    if (!(this.categoriesChosed.includes(id))) {
      this.categoriesChosed.push(id);
    } else {
      this.categoriesChosed.splice(this.categoriesChosed.indexOf(id), 1);
    }
    this.searchEnterprisesByCategories();
  }

  searchEnterprisesByCategories(): void {
    const offset = (this.page - 1) * this.amountPerPage;
    const categories = this.categoriesChosed.length > 0 && this.categoriesChosed.join(',') || '';
    const regions = this.regionsChosed.length > 0 && this.regionsChosed.join(',') || '';

    this.enterpriseService.searchEnterprisesByCategories(categories, regions, offset, this.amountPerPage).subscribe((resp) => {
      this.totalItems = +resp.headers.get('X-Total-Count');
      this.enterprises = <EnterpiseShort[]>resp.body;
      this.searchType = 'categories';
    });
  }

  getRegionList(): void {
    this.enterpriseService.getRegions().subscribe((regions) => {
      this.regions = regions;
    });
  }

  getCategoriesList(): void {
    this.enterpriseService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

}
