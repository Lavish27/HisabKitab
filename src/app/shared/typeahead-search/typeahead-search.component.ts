import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TypeaheadSearchService } from 'src/app/Services/typeahead-search.service';
import { HttpParams } from '@angular/common/http';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-typeahead-search',
  templateUrl: './typeahead-search.component.html',
  styleUrls: ['./typeahead-search.component.css']
})
export class TypeaheadSearchComponent implements OnInit {

  public items: {value:string, isChecked: boolean}[] = [];
  @Input() searchUrl;
  @Output() public selectedItemsEvent= new EventEmitter();
  public dropDownOpen= false;
  public selectPlaceHolder= "Select";
  public searchPlaceHolder= "Search";
  public searchItem;
  public selectedItem: string;
  private delimitter= '%dlmtr%'
  public searchItemSub$=  new Subject();

  constructor(private typeAheadService: TypeaheadSearchService) { }

  ngOnInit(): void {
    this.prepareSearchUrl(this.searchUrl);
    this.refreshFilterOptions(new HttpParams());
    this.subscribeSubject();
    
  }

  public onSearch(event){
    this.searchItemSub$.next(event);
  }

  onReset(){
    this.searchItem= '';
    this.searchItemSub$.next(this.searchItem);
  }

  private subscribeSubject(){
    this.searchItemSub$.
    pipe(
      debounceTime(800),
      distinctUntilChanged(),
      switchMap(val=> {
        let params = new HttpParams();
        params = params.append('value', val.toString());
        return this.typeAheadService.getFilterOptions(this.searchUrl, params); 
      })
      ).subscribe(data => this.items= this.createFilterItems(data));
  }

  private refreshFilterOptions(params: HttpParams){
    this.typeAheadService.getFilterOptions(this.searchUrl, params).subscribe(data=> this.items= this.createFilterItems(data));
  }

  private createFilterItems(data: string[]){
    let updatedItems: {value:string, isChecked: boolean}[]= [];
    for(let val of this.items){
      if(val.isChecked === true){
       let index= data.indexOf(val.value);
       if(index!= -1){
         data.splice(index,1);
       }
       updatedItems.push(val);
      }
    }
    for(let val of data){
      updatedItems.push({value: val, isChecked: false});
    }
    return updatedItems;
  }

  private prepareSearchUrl(searchUrl: string){
    this.searchUrl= searchUrl.split("{")[0];
  }

  onClickSelectedInput(){
    this.dropDownOpen = !this.dropDownOpen;  
  }

  onSelectAction(event){
    let selectedItems: string[]= [];
    for(let val of this.items){
      if(val.isChecked === true){
        selectedItems.push(val.value);
      }
      let size= selectedItems.length;
      if(size == 1){
        this.selectedItem= selectedItems[0];
      }
      else if(size == 0){
        this.selectedItem= '';
      }
      else{
        this.selectedItem= size+" selected";
      }
    }
    this.selectedItemsEvent.emit(selectedItems.join(this.delimitter));

  }


}
