import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {tap} from 'rxjs/operators';
import 'rxjs/add/operator/map';

import {EnterpriseFull} from '../schemas/enterprise-full';


@Injectable()
export class EnterpriseService {
  private apiUrl = 'https://bizguid.herokuapp.com/api';

  // search
  regionsSelected = [];
  categoriesSelected = [];
  searchText: string;

  // pagination
  totalItems = 100;
  page = 1;
  amountPerPage = 25;

  // TODO: FIX HARDCODE SECTION
  searchType = 'all';

  constructor(private http: HttpClient) {
  }

  // single
  getSingleEnterprise(slug): Observable<EnterpriseFull> {
    return this.http.get<EnterpriseFull>(`${this.apiUrl}/enterprises/${slug}`).pipe(
      tap(enterprise => console.log(`single enterprise fetch`))
    );
  }

  // all
  getAllEnterprises(offset: number, amount: number) {
    return this.http.get(`${this.apiUrl}/enterprises?offset=${offset}&amount=${amount}`, {observe: 'response'});
  }
  getEnterprisesByText(text: string, offset: number, amount: number) {
    const textToSearch = text || '';
    return this.http.get(`${this.apiUrl}/enterprises/text-search/${textToSearch}?offset=${offset}&amount=${amount}`, {observe: 'response'});
  }
  getEnterprisesByCategoriesAndRegions(categoryIds: string, regionIds: string, offset: number, amount: number) {
    const queryUrl = `categoryIds=${categoryIds}&regionIds=${regionIds}&offset=${offset}&amount=${amount}`;
    return this.http.get(`${this.apiUrl}/enterprises/search?${queryUrl}`, {observe: 'response'});
  }


  // regions & categories
  getRegions(parentRegionId): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/regions/${parentRegionId}`);
  }

  getCategories(parentCategoryId): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/categories/${parentCategoryId}`);
  }

  // TODO: move to backend
  getAdditionalInfoByIds(categories=[],regions=[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/enterprises/additional`,{categories,regions});
  }
}
