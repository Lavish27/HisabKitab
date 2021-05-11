import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseHistoryComponent } from './screeners/purchase-history/purchase-history.component';
import { SaleHistoryComponent } from './screeners/sale-history/sale-history.component';
import { NewSaleComponent } from './Forms/new-sale/new-sale.component';
import { NewPurchaseComponent } from './Forms/new-purchase/new-purchase.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SaleInvoiceComponent } from './PrintLayouts/sale-invoice/sale-invoice.component';


const routes: Routes = [
  {path:'', redirectTo: 'hem-jewellers', pathMatch: 'full'},
  {path:'hem-jewellers', component: HomeComponent},
  {path:'hem-jewellers/sale-history', component: SaleHistoryComponent},
  {path:'hem-jewellers/purchase-history', component: PurchaseHistoryComponent},
  {path:'hem-jewellers/new-sale', component: NewSaleComponent},
  {path:'hem-jewellers/new-purchase', component: NewPurchaseComponent},
  {path:'hem-jewellers/sale-invoice/:invoiceId', component: SaleInvoiceComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
