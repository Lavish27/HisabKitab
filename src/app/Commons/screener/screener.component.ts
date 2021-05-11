import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ScreenerService } from 'src/app/Services/screener.service';
import { Metadata } from 'src/app/Templates/screener-metadata';
import { HttpParams } from '@angular/common/http';

declare var $;
@Component({
  selector: 'app-screener',
  templateUrl: './screener.component.html',
  styleUrls: ['./screener.component.css']
})
export class ScreenerComponent implements OnInit {
  
  constructor(private screenerService: ScreenerService) { }
  public metadata : Metadata;
  public loader: boolean = true;
  public screenerDataLoader : boolean = true;
  public screenerData : any[];
  public dtOptions : any;
  params = new HttpParams();
  @Input() public screenerName: string;
  @ViewChild('saleTable') table : ElementRef;
 
  ngOnInit(): void {
    this.screenerService.getMetadata(this.screenerName)
    .subscribe(data => {this.metadata = data;
       this.loader = false;
      this.getScreenerData();},
      error => alert("Something Unexpected Happened, Please Try Again After Some Time or Contact Developer")
      );
  }

  private getScreenerData():void{
    this.screenerService.getScreenerData(this.screenerName, this.params)
    .subscribe(data => {this.screenerData = data;
    this.screenerDataLoader = false;
    let columnsData = [];
    for(let column of this.metadata.columns.content){
      if(column.columnMappingName == 'invoice_number'){
        columnsData.push({title: column.columnName, data:column.columnMappingName, render: function(data, type, row, metadata){
          let invoiceNo: string= data;
          data= "<a href=\"/hem-jewellers/sale-invoice/"+invoiceNo+"\" target= \"_top\">"+ invoiceNo+" </a>";
          return data;
        }});
      }
      else{
      columnsData.push({title: column.columnName, data:column.columnMappingName});
      }
    }
    this.dtOptions = {
      data : this.screenerData,
      columns : columnsData,
      aaSorting:[[0,'desc']]
    };
    $(this.table.nativeElement).DataTable(this.dtOptions); 
  },
    error => alert("Something Unexpected Happened, Please Try Again After Some Time or Contact Developer")
    );
     
  }

  public refreshTableData(event, filterSuffix){
    this.params= this.params.delete(filterSuffix);
    this.params= this.params.append(filterSuffix, event);
    console.log(event);
  
    this.screenerService.getScreenerData(this.screenerName, this.params)
    .subscribe(data => {this.screenerData = data;
    this.dtOptions= {...this.dtOptions, data: this.screenerData};
    $(this.table.nativeElement).DataTable().destroy();
    $(this.table.nativeElement).DataTable(this.dtOptions);
    },
    error => alert("Something Unexpected Happened, Please Try Again After Some Time or Contact Developer")); 
  }


}
