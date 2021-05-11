import { Component, OnInit } from '@angular/core';
import { ClientDetailsService } from '../Services/client-details.service';
import { ClientDetails } from '../Templates/client-details-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public clientDetails : ClientDetails;
  constructor(private clientDetailsService : ClientDetailsService) { }

  ngOnInit(): void {
    this.clientDetailsService.getClientDetails().subscribe(data => this.clientDetails = data,
      error =>alert("Something Unexpected Happened, Please Try Again After Some Time or Contact Developer")); 
  }

}
