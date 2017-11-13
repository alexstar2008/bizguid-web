import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {tap} from 'rxjs/operators';
import 'rxjs/add/operator/map';

import {EnterpiseShort} from '../schemas/enterpise-short';
import {EnterpriseFull} from '../schemas/enterprise-full';


@Injectable()
export class EnterpriseService {
  private apiUrl = 'https://bizguid.herokuapp.com/api';

  constructor(private http: HttpClient) {
  }


  getAllEnterprises(offset: number, amount: number) {
    return this.http.get(`${this.apiUrl}/enterprises?offset=${offset}&amount=${amount}`, {observe: 'response'});
  }

  searchEnterprisesByText(text: string, offset: number, amount: number) {
    const textToSearch = text || '';
    return this.http.get(`${this.apiUrl}/enterprises/text-search/${textToSearch}?offset=${offset}&amount=${amount}`, {observe: 'response'});
  }

  searchEnterprisesByCategories(categoryIds: string, regionIds: string, offset: number, amount: number) {
    const queryUrl = `categoryIds=${categoryIds}&regionIds=${regionIds}&offset=${offset}&amount=${amount}`;
    console.log(queryUrl);
    return this.http.get(`${this.apiUrl}/enterprises/search?${queryUrl}`, {observe: 'response'});
  }

  getSingleEntrprise(slug): Observable<EnterpriseFull> {
    return this.http.get<EnterpriseFull>(`${this.apiUrl}/enterprises/${slug}`).pipe(
      tap(enterprise => console.log(`single enterprise fetch`))
    );
  }

  getRegions(): Observable<any> {
    const regionParentId = '59ed26220e0742b928d18f7c';
    return this.http.get<any>(`${this.apiUrl}/regions/${regionParentId}`).pipe();
  }
  getCategories(): Observable<any> {
    const categoryParentId = '';
    return this.http.get<any>(`${this.apiUrl}/categories/${categoryParentId}`);
  }
}
