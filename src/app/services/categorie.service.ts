import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Categorie} from '../model/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private url = environment.BASE_URL + '/categorie';
  constructor(private  httpClient: HttpClient) { }

  public getAll(): Observable<Categorie[]> {
    return this.httpClient.get<Categorie[]>(this.url);
  }

  public getById(id): Observable<Categorie> {
    return this.httpClient.get<Categorie>(this.url + '/' + id);
  }

  public save(categorie: Categorie): Observable<any> {
    return this.httpClient.post<any>(this.url, categorie);
  }

  public update(categorie: Categorie): Observable<any> {
    return this.httpClient.put<any>(this.url, categorie);
  }

  public delete(id): Observable<any> {
    return this.httpClient.delete<any>(this.url + '/' + id);
  }
}
