import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private url = environment.BASE_URL + '/user';
  constructor(private httpClient: HttpClient) { }

  public getByEmail(email) {
    return this.httpClient.get( this.url + '/' + email);
  }
  public changePassword(pwd): Observable<any> {
   return this.httpClient.patch(this.url, pwd);
  }
}
