import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SaleHistoryComponent } from './screeners/sale-history/sale-history.component';
import { PurchaseHistoryComponent } from './screeners/purchase-history/purchase-history.component';
import { HeaderComponent } from './Commons/header/header.component';
import { FooterComponent } from './Commons/footer/footer.component';
import { NewSaleComponent } from './Forms/new-sale/new-sale.component';
import { NewPurchaseComponent } from './Forms/new-purchase/new-purchase.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {HttpClientModule} from '@angular/common/http';
import { ScreenerService } from './Services/screener.service';
import { ScreenerComponent } from './Commons/screener/screener.component';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { SaleBillService } from './Services/sale-bill.service';
import { StoreModule } from '@ngrx/store';
import { ClientDetailsService } from './Services/client-details.service';
import { rootReducer } from 'src/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools' ;
import { environment } from 'src/environments/environment';
import { ClientDetailsComponent } from './Forms/client-details/client-details.component';
import { SaleInvoiceComponent } from './PrintLayouts/sale-invoice/sale-invoice.component';
import { NgxPrintModule } from 'ngx-print';
import { TypeaheadSearchComponent } from './shared/typeahead-search/typeahead-search.component';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import { TypeaheadSearchService } from './Services/typeahead-search.service';

@NgModule({
  declarations: [
    AppComponent,
    SaleHistoryComponent,
    PurchaseHistoryComponent,
    HeaderComponent,
    FooterComponent,
    NewSaleComponent,
    NewPurchaseComponent,
    HomeComponent,
    PageNotFoundComponent,
    ScreenerComponent,
    ClientDetailsComponent,
    SaleInvoiceComponent,
    TypeaheadSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule,
    PerfectScrollbarModule,
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production})
  ],
  providers: [ScreenerService, SaleBillService, ClientDetailsService, TypeaheadSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
