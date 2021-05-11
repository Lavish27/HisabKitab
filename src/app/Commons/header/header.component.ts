import { Component, OnInit } from '@angular/core';
import { ClientDetailsService } from 'src/app/Services/client-details.service';
import { ClientDetails } from 'src/app/Templates/client-details-model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  public clientDetails : ClientDetails;
  constructor(private clientDetailsService : ClientDetailsService) { }

  ngOnInit(): void {
    this.clientDetailsService.getClientDetails().subscribe(data => this.clientDetails = data,
      error =>alert("Something Unexpected Happened, Please Try Again After Some Time or Contact Developer"));
  }

}
