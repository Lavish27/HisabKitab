import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Metadata } from '../Templates/screener-metadata';
import {catchError} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ScreenerService {

  constructor(private http: HttpClient) { }

  baseUrl:string = "http://localhost:8080/GSTapp/screener/"

  getMetadata(screenerName : String): Observable<Metadata>{
    return this.http.get<Metadata>(this.baseUrl+screenerName+"/metadata");
  }

  getScreenerData(screenerName : String, params : HttpParams): Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl+screenerName, {params : params});
    
  }

}
