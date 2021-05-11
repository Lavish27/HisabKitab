import { Component, OnInit} from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SaleBillService } from 'src/app/Services/sale-bill.service';
import { Router } from '@angular/router';
import { ClientDetailsService } from 'src/app/Services/client-details.service';

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.component.html',
  styleUrls: ['./new-sale.component.css']
})
export class NewSaleComponent implements OnInit {

silverToggleState:boolean = true;
goldToggleState:boolean = true;
todaysDate = formatDate(new Date(),'yyyy-MM-dd', 'en');
submitDisabled = false;

  constructor(private fb:FormBuilder, private saleBillSevice:SaleBillService, private router:Router,
    private clientDetailsService : ClientDetailsService) { }
  public saleForm : FormGroup;

  ngOnInit(): void {
    this.clientDetailsService.getClientDetails().subscribe(data =>
    this.saleForm = this.fb.group({
       custName:['', Validators.required],
	 custAddress:['', Validators.required],
	 s_rt:[0, [Validators.required, Validators.pattern('\\d+(.\\d+)?')]],
	 g_rt:[0, [Validators.required, Validators.pattern('\\d+(.\\d+)?')]],
	 s_wt:[0,[Validators.required, Validators.pattern('\\d+(.\\d+)?')]],
	 g_wt:[0, [Validators.required, Validators.pattern('\\d+(.\\d+)?')]],
	 gHsn:[data.ghsn],
	 sHsn:[data.shsn],
	 sgst:[0,[Validators.required, Validators.pattern('\\d+(.\\d+)?')]],
	 cgst:[0,[Validators.required, Validators.pattern('\\d+(.\\d+)?')]],
	 igst:[0,[Validators.required, Validators.pattern('\\d+(.\\d+)?')]],
	 transportMode:[''],
	 vehicleNo:[''],
	 date:[this.todaysDate, Validators.required],
	 phoneNo:['', Validators.required],
	 aadhar:[''],
	 state:[''],
	 stateCode:[''],
	 sAmount:[0, [Validators.required, Validators.pattern('\\d+(.\\d+)?')]],
	 gAmount:[0, [Validators.required, Validators.pattern('\\d+(.\\d+)?')]],
	 subTotal:[0, [Validators.required, Validators.pattern('\\d+(.\\d+)?')]],
	 sgstRate:[data.sgst, [Validators.required, Validators.pattern('\\d+(.\\d{1,2})?')]],
   cgstRate:[data.cgst, [Validators.required, Validators.pattern('\\d+(.\\d{1,2})?')]],
	 igstRate:[data.igst, [Validators.required, Validators.pattern('\\d+(.\\d{1,2})?')]],
	 totalGst:[0, [Validators.required, Validators.pattern('\\d+(.\\d+)?')]],
   grandTotal:[0, [Validators.required, Validators.pattern('\\d+(.\\d{1,2})?')]],
   roundOff: [0,[Validators.required, Validators.pattern('\\d+')]],
   grandTotalWords:['Zero', Validators.required]
 }),
    error =>alert("Something Unexpected Happened, Please Try Again After Some Time or Contact Developer"));
    this.onChanges();
  }

  onClickSilver():void{
    this.silverToggleState = !this.silverToggleState;
  }

  onClickGold():void{
    this.goldToggleState = !this.goldToggleState;
  }

  onChanges():void{
    this.saleForm.get('s_wt').valueChanges.subscribe(val => {
      this.saleForm.get('sAmount').setValue((val * this.saleForm.get('s_rt').value/10).toFixed(2))
    });

    this.saleForm.get('s_rt').valueChanges.subscribe(val => {
      this.saleForm.get('sAmount').setValue((val/10 * this.saleForm.get('s_wt').value).toFixed(2))
    });
      
    this.saleForm.get('g_wt').valueChanges.subscribe(val => {
      this.saleForm.get('gAmount').setValue((val * this.saleForm.get('g_rt').value/10).toFixed(2))
    });
  
    this.saleForm.get('g_rt').valueChanges.subscribe(val => {
      this.saleForm.get('gAmount').setValue((val/10 * this.saleForm.get('g_wt').value).toFixed(2))
    });

    this.saleForm.get('sAmount').valueChanges.subscribe(val => {
      this.saleForm.get('subTotal').setValue((parseFloat(val) + parseFloat(this.saleForm.get('gAmount').value)).toFixed(2))
    });

    this.saleForm.get('gAmount').valueChanges.subscribe(val => {
      this.saleForm.get('subTotal').setValue((parseFloat(val) + parseFloat(this.saleForm.get('sAmount').value)).toFixed(2))
    });

    this.saleForm.get('subTotal').valueChanges.subscribe(val => {
      this.saleForm.get('cgst').setValue((val * this.saleForm.get('cgstRate').value/100).toFixed(2));
      this.saleForm.get('sgst').setValue((val * this.saleForm.get('sgstRate').value/100).toFixed(2));
      this.saleForm.get('igst').setValue((val * this.saleForm.get('igstRate').value/100).toFixed(2));
      this.saleForm.get('grandTotal').setValue((parseFloat(val) + parseFloat(this.saleForm.get('totalGst').value)).toFixed(2));
    });

    this.saleForm.get('cgstRate').valueChanges.subscribe(val => {
      this.saleForm.get('cgst').setValue((val/100 * this.saleForm.get('subTotal').value).toFixed(2))
    });

    this.saleForm.get('sgstRate').valueChanges.subscribe(val => {
      this.saleForm.get('sgst').setValue((val/100 * this.saleForm.get('subTotal').value).toFixed(2))
    });

    this.saleForm.get('igstRate').valueChanges.subscribe(val => {
      this.saleForm.get('igst').setValue((val/100 * this.saleForm.get('subTotal').value).toFixed(2))
    });

    this.saleForm.get('cgstRate').valueChanges.subscribe(val => {
      this.saleForm.get('cgst').setValue((val/100 * this.saleForm.get('subTotal').value).toFixed(2))
    });

    this.saleForm.get('cgst').valueChanges.subscribe(val => {
      this.saleForm.get('totalGst').setValue((parseFloat(val) + parseFloat(this.saleForm.get('sgst').value) + parseFloat(this.saleForm.get('igst').value)).toFixed(2))
    });

    this.saleForm.get('sgst').valueChanges.subscribe(val => {
      this.saleForm.get('totalGst').setValue((parseFloat(val) + parseFloat(this.saleForm.get('cgst').value) + parseFloat(this.saleForm.get('igst').value)).toFixed(2))
    });

    this.saleForm.get('igst').valueChanges.subscribe(val => {
      this.saleForm.get('totalGst').setValue((parseFloat(val) + parseFloat(this.saleForm.get('sgst').value) + parseFloat(this.saleForm.get('cgst').value)).toFixed(2))
    });

    this.saleForm.get('totalGst').valueChanges.subscribe(val => {
      this.saleForm.get('grandTotal').setValue((parseFloat(this.saleForm.get('subTotal').value) + parseFloat(val)).toFixed(2));
    });

    this.saleForm.get('grandTotal').valueChanges.subscribe(val => {
      this.saleForm.get('roundOff').setValue(Math.round(parseFloat(val)));
    });

    this.saleForm.get('roundOff').valueChanges.subscribe(val => {
      this.saleForm.get('grandTotalWords').setValue(this.wordConvertor(val));
    }); 
  }

  wordConvertor(numericValue:number) : string{
    let ones : string[]= ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    let oneTens : string[] = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
      "Seventeen", "Eighteen", "Nineteen" ];
    let tens : string[]= ["Zero","Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    let amount = {10000000 : "Crore", 100000: "Lakh", 1000 : "Thousand", 10 : "Hundred"};
    let amountInWords : string = "";

    for(let i = 10000000; i>=1000; i = Math.floor(i/100)){
      let cp : number = Math.floor(numericValue/i);
      if(cp > 0){
        amountInWords = this.convertIntoWords(cp, ones, oneTens, tens, amountInWords);
        amountInWords = amountInWords + amount[i] + " ";
      }
      numericValue = numericValue % i;
  }

  let hp : number = Math.floor(numericValue / 100);
  if(hp>0){
    amountInWords = amountInWords + ones[hp] + " " + amount[10] + " ";
  }
  if(numericValue%100 > 0){
   amountInWords = this.convertIntoWords(numericValue%100, ones, oneTens, tens, amountInWords);
  }
  if(amountInWords.length > 0){
    amountInWords = "Rupees " + amountInWords + "Only"; 
  }
    return amountInWords;

  }

  convertIntoWords(cp : number, ones : string[], oneTens : string[], tens : string[], amountInWords:string) : string{
    let tp : number = Math.floor(cp/10); 
    let op : number = cp % 10;

        if(tp>0){
          if(tp === 1){
            amountInWords = amountInWords + oneTens[op] + " ";
          }else{
            amountInWords = amountInWords + tens[tp] + " ";
            if(op > 0){
              amountInWords = amountInWords + ones[op] + " ";
            }
          }
        }else{
          amountInWords = amountInWords + ones[op] + " ";
        }
        return amountInWords;

  }

  public onSubmit(){
    this.submitDisabled = true;
    this.saleBillSevice.submitSaleBill(this.saleForm)
    .subscribe(
      data => 
        this.router.navigate(['/hem-jewellers/sale-invoice', data]),
      error => {
        this.submitDisabled = false;
        alert("Something Unexpected Happened, Please Try Again After Some Time or Contact Developer")}
    );

  }



}
