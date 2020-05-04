import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {

  private url = environment.BASE_URL + '/candidat';
  constructor(private  httpClient: HttpClient) { }

  public register(candidat): Observable<any> {
    return this.httpClient.post(this.url , candidat);
  }
}
