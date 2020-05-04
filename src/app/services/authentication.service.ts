import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Utilisateur} from '../model/utilisateur';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url = environment.BASE_URL + '/login';
  constructor(private httpClient: HttpClient) { }
  public authenticate(user: Utilisateur) {
    return this.httpClient.post(this.url, user, {observe: 'response'});
  }

  public storeToken(token) {
    localStorage.setItem('token', token);
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    location.reload();
  }
  hasRole() {
    const jwtHelper = new JwtHelperService();
    const decodeToken = jwtHelper.decodeToken(localStorage.getItem('token'));
    const role = decodeToken.roles[0];
    if (role === 'ROLE_ADMIN') {
      return 'Adminstrateur';
    } else if (role === 'ROLE_ABONNE') {
      return 'Abonné';
    } else {
      return 'Candidat';
    }
  }

}
