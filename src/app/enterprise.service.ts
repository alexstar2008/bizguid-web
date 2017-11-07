import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {tap} from 'rxjs/operators';

import {EnterpiseShort} from './enterpise-short';



@Injectable()
export class EnterpriseService {
  private apiUrl = 'https://bizguid.herokuapp.com/api';

  constructor(private http: HttpClient) {
  }

  getAllEnterprises(): Observable<EnterpiseShort[]> {
    return this.http.get(this.apiUrl + '/enterprises').pipe(
      tap(enterpries => console.log(`fetched enterpries`))
    );
  }

}
