import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-new-purchase',
  templateUrl: './new-purchase.component.html',
  styleUrls: ['./new-purchase.component.css']
})
export class NewPurchaseComponent implements OnInit {

  silverToggleState:boolean = true;
  goldToggleState:boolean = true;
  todaysDate = formatDate(new Date(),'yyyy-MM-dd', 'en');
  constructor() { }

  ngOnInit(): void {
  }

  onClickSilver():void{
    this.silverToggleState = !this.silverToggleState;
  }

  onClickGold():void{
    this.goldToggleState = !this.goldToggleState;
  }

}
