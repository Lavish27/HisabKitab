import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleBillService {

  constructor(private http: HttpClient) { }

  submitSaleBill(saleForm:FormGroup):Observable<any>{
    return this.http.post<any>("http://localhost:8080/GSTapp/sale-data", saleForm.value);
  }

  getSaleBillData(invoiceId: number): Observable<any>{
    return this.http.get<any>("http://localhost:8080/GSTapp/sale-data/"+invoiceId);
  }
}
