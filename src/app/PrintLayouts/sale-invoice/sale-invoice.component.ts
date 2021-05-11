import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SaleBillService } from 'src/app/Services/sale-bill.service';
import { ClientDetailsService } from 'src/app/Services/client-details.service';
import { ClientDetails } from 'src/app/Templates/client-details-model';

@Component({
  selector: 'app-sale-invoice',
  templateUrl: './sale-invoice.component.html',
  styleUrls: ['./sale-invoice.component.css']
})
export class SaleInvoiceComponent implements OnInit {

  public invoiceNo: number;
  public clientDetails: ClientDetails;
  public saleBillData;
  public sNoCounter: number= 1;
  constructor(private route : ActivatedRoute, private saleBillSevice:SaleBillService, 
    private clientDetailsService : ClientDetailsService, private router:Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params:ParamMap) => this.invoiceNo = parseInt(params.get('invoiceId'))
    );
    this.clientDetailsService.getClientDetails().subscribe(data => this.clientDetails= data,
      error =>alert("Something Unexpected Happened, Please Try Again After Some Time or Contact Developer"));

    this.saleBillSevice.getSaleBillData(this.invoiceNo).subscribe(data => this.saleBillData= data,
      error =>alert("Something Unexpected Happened, Please Try Again After Some Time or Contact Developer"));
  }

  public incrementSnoCounter(){
   this.sNoCounter = this.sNoCounter+ 1;
  }

  public cancelEvent(){
    this.router.navigate(['/hem-jewellers']);
  }
}
