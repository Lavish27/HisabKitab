import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeaheadSearchService {

  constructor(private http: HttpClient) { }

  getFilterOptions(url : string, params : HttpParams): Observable<any[]>{
    return this.http.get<any[]>(url, {params : params});
    
  }
}
