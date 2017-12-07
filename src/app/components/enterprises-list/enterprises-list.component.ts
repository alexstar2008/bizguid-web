import {Component, OnInit, OnDestroy} from '@angular/core';

import {EnterpriseService} from '../../services/enterprise.service';
import {EnterpiseShort} from '../../schemas/enterpise-short';
import {Region} from '../../schemas/region';
import {Category} from '../../schemas/category';

@Component({
  selector: 'app-enterprises-list',
  templateUrl: './enterprises-list.component.html',
  styleUrls: ['./enterprises-list.component.css']
})

export class EnterprisesListComponent implements OnInit, OnDestroy {
  enterprises: EnterpiseShort[];
  // filter info
  regions: Region[];
  categories: Category[];
  middleRegions: Region[];
  middleCategories: Category[];
  lowCategories: Category[];

  // dropdown
  activeHighCategory: Category;
  activeMiddleCategory: Category;
  activeHighRegion: Region;

  // loading in progress
  isContentLoading = true;

  // search
  regionsSelected = [];
  categoriesSelected = [];
  searchText: string;

  // pagination
  totalItems = 100;s
  page = 1;
  amountPerPage = 25;

  // TODO: FIX HARDCODE SECTION
  searchType = 'all';

  constructor(private enterpriseService: EnterpriseService){
    // TODO: change filter caching
    this.regionsSelected = this.enterpriseService.regionsSelected;
    this.categoriesSelected = this.enterpriseService.categoriesSelected;
    this.searchText = this.enterpriseService.searchText;
    this.totalItems = this.enterpriseService.totalItems;
    this.page = this.enterpriseService.page;
    this.amountPerPage = this.enterpriseService.amountPerPage;
    this.searchType = this.enterpriseService.searchType;
  }

  ngOnInit() {
    this.matchSearchType();
    this.getRegions();
    this.getCategories();
  }

  ngOnDestroy() {
    this.enterpriseService.regionsSelected = this.regionsSelected;
    this.enterpriseService.categoriesSelected = this.categoriesSelected;
    this.enterpriseService.searchText = this.searchText;
    this.enterpriseService.totalItems = this.totalItems;
    this.enterpriseService.page = this.page;
    this.enterpriseService.amountPerPage = this.amountPerPage;
    this.enterpriseService.searchType = this.searchType;
  }

  matchSearchType(): void {
    switch (this.searchType) {
      case 'all':
        this.getAllEnterprises();
        break;
      case 'categoriesAndRegions':
        this.getEnterprisesByCategoriesAndRegions();
        break;
      case 'text':
        this.getEnterprisesByText();
        break;
      default:
        break;
    }
  }

  removeFilters() {
    this.regionsSelected = [];
    this.categoriesSelected = [];
  }

  // Pagination
  onPrev(): void {
    if (this.page > 1) {
      this.page--;
    }
    this.matchSearchType();
  }
  onNext(): void {
    this.page++;
    this.matchSearchType();
  }
  onPage(page: number): void {
    this.page = page;
    this.matchSearchType();
  }

  // set search text
  setSearchText(searchText): void {
    this.searchText = searchText;
    if (this.searchText === '' || /^\s*$/.test(this.searchText)) {
      this.searchText = '';
      this.getAllEnterprises();
    }else{
      this.getEnterprisesByText();
    }
  }
  // add & remove region to filter
  addRegionToFilter(event: Event, region: Region, regionType: String): void {
    event.preventDefault();

    switch (regionType) {
      case 'highRegion' :
        this.activeHighRegion = region;
        this.getRegions('middleRegions', region._id);
        break;
      case 'middleRegion':
        break;
      default :
        break;
    }

    if (!(this.regionsSelected.includes(region))) {
      this.regionsSelected.push(region);
      this.getEnterprisesByCategoriesAndRegions();
    }

  }
  removeRegionFromFilter(event: Event, region: Region): void {
    const regionIndex = this.regionsSelected.indexOf(region);
    this.regionsSelected.splice(regionIndex, 1);

    this.getEnterprisesByCategoriesAndRegions();
  }
  // add & remove category to filter
  addCategoryToFilter(event: Event, category: Category, categoryType: String): void {
    event.preventDefault();

    switch (categoryType) {
      case 'highCategory':
        this.activeHighCategory = category;
        this.getCategories('middleCategories', category._id);
        break;
      case 'middleCategory':
        this.activeMiddleCategory = category;
        this.getCategories('lowCategories', category._id);
        break;
      case 'lowCategory':
        break;
      default:
        break;
    }

    if (!this.categoriesSelected.includes(category)) {
      this.categoriesSelected.push(category);
      this.getEnterprisesByCategoriesAndRegions();
    }


  }
  removeCategoryFromFilter(event: Event, category: Category) {
    const categoryIndex = this.categoriesSelected.indexOf(category);
    this.categoriesSelected.splice(categoryIndex, 1);

    this.getEnterprisesByCategoriesAndRegions();
  }

  // search enterprises
  getAllEnterprises(): void {
    this.isContentLoading = true;
    const offset = (this.page - 1) * this.amountPerPage;
    this.enterpriseService.getAllEnterprises(offset, this.amountPerPage).subscribe((resp) => {
      this.totalItems = +resp.headers.get('X-Total-Count');
      this.enterprises = <EnterpiseShort[]>resp.body;

      this.searchType = 'all';
      this.isContentLoading = false;
    });
  }
  getEnterprisesByText(): void {
    this.removeFilters();

    this.isContentLoading = true;
    const offset = (this.page - 1) * this.amountPerPage;
    this.enterpriseService.getEnterprisesByText(this.searchText, offset, this.amountPerPage).subscribe((resp) => {
      this.totalItems = +resp.headers.get('X-Total-Count');
      this.enterprises = <EnterpiseShort[]>resp.body;

      this.searchType = 'text';
      this.isContentLoading = false;
    });
  }
  getEnterprisesByCategoriesAndRegions(): void {
    this.isContentLoading = true;
    const offset = (this.page - 1) * this.amountPerPage;
    const categories = this.categoriesSelected.length > 0 && this.categoriesSelected.map((item) => item._id).join(',') || '';
    const regions = this.regionsSelected.length > 0 && this.regionsSelected.map((item) => item._id).join(',') || '';

    this.enterpriseService.getEnterprisesByCategoriesAndRegions(categories, regions, offset, this.amountPerPage).subscribe((resp) => {
      this.totalItems = +resp.headers.get('X-Total-Count');
      this.enterprises = <EnterpiseShort[]>resp.body;

      this.searchType = 'categoriesAndRegions';
      this.isContentLoading = false;
    });
  }
  //get region & categories
  getRegions(searched = 'regions', parentRegionId = '59ed26220e0742b928d18f7c'): void {
    this.enterpriseService.getRegions(parentRegionId).subscribe((regions) => {
      if (searched == 'regions') {
        this.regions = regions;
      } else {
        if (!this[searched]) {
          this[searched] = {};
        }
        this[searched][parentRegionId] = regions;
      }
    });
  }
  getCategories(searched = 'categories', parentCategoryId = ''): void {
    this.enterpriseService.getCategories(parentCategoryId).subscribe((categories) => {
      if (searched === 'categories') {
        this.categories = categories;
      } else {
        if (!this[searched]) {
          this[searched] = {};
        }
        this[searched][parentCategoryId] = categories
      }
    });
  }
}
