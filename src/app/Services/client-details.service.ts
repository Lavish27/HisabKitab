import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientDetails } from '../Templates/client-details-model';
import { Observable, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootReducerState, getClientDetailsStateData, getClientDetailsStateLoading, getClientDetailsStateLoaded } from 'src/reducers';
import { clientDetailsRequestAction, clientDetailsSuccessAction, clientDetailsFailedAction } from 'src/actions/client-details-action';
import { getClientDetailsLoading } from 'src/reducers/client-details-reducer';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientDetailsService {
  private clientDetails : ClientDetails;

  constructor(private http: HttpClient, private store: Store<RootReducerState>) { }

  baseUrl:string = "http://localhost:8080/GSTapp"

  getClientDetails(): Observable<ClientDetails>{
    const loading$ = this.store.select(getClientDetailsStateLoading);
    const loaded$ = this.store.select(getClientDetailsStateLoaded);
    combineLatest([loading$, loaded$]).subscribe((data) =>{
      if(!data[0] && !data[1]){
        this.store.dispatch(new clientDetailsRequestAction());
        this.http.get<ClientDetails>(this.baseUrl+"/client-details").subscribe(
          data =>  this.store.dispatch(new clientDetailsSuccessAction(data)),
          error =>{this.store.dispatch(new clientDetailsFailedAction());
            alert("Something Unexpected Happened, Please Try Again After Some Time or Contact Developer");
         } );
      }
    });

      return this.store.select(getClientDetailsStateData);
  }

  updateClientDetails(clientDetailsForm:FormGroup):void{
    this.http.put<any>(this.baseUrl+"/client-details", clientDetailsForm.value).subscribe(
      data => {this.store.dispatch(new clientDetailsSuccessAction(clientDetailsForm.value));
        alert("changes saved successfully");
      },
      error => alert("Something Unexpected Happened, Please Try Again After Some Time or Contact Developer")
    );
  }

}
