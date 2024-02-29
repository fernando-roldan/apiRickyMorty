import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'https://rickandmortyapi.com/api/character/';

  constructor(private http: HttpClient) { }

  public getData(page: string): Observable<any> {

    return this.http.get<any>(page);
  }

  public getDetails(id: string): Observable<any> {

    let urlDetails = this.url + id;

    return this.http.get<any>(urlDetails);
  }
}
