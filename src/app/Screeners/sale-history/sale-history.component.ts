import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sale-history',
  templateUrl: './sale-history.component.html',
  styleUrls: ['./sale-history.component.css']
})
export class SaleHistoryComponent implements OnInit {

  constructor() { }

  public screenerName: string = "sale-screener";

  ngOnInit(): void {

  }

}
