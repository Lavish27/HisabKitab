import { Component, OnInit, Input } from '@angular/core';
import { ClientDetailsService } from 'src/app/Services/client-details.service';
import { ClientDetails } from 'src/app/Templates/client-details-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  constructor(private clientDetailsService : ClientDetailsService, private fb:FormBuilder, private router:Router) { }
  public clientDetails : ClientDetails;
  public clientDetailsForm : FormGroup;
  @Input() public modalName: String;
  public submitDisabled = false;

  ngOnInit(): void {
    this.clientDetailsService.getClientDetails().subscribe(data => 
      this.clientDetailsForm = this.fb.group({
   clientName:[data.clientName, Validators.required],
	 description:[data.description] ,
	 address:[data.address, Validators.required],
	 gstin:[data.gstin, Validators.required],
	 phone:[data.phone, Validators.required],
	 bankName:[data.bankName, Validators.required],
	 bankBranch:[data.bankBranch, Validators.required],
	 bankAccNo:[data.bankAccNo, Validators.required],
	 bankIFSC:[data.bankIFSC, Validators.required],
	 ghsn:[data.ghsn,Validators.required],
	 shsn:[data.shsn, Validators.required],
	 sgst:[data.sgst, [Validators.required, Validators.pattern('\\d+(.\\d{1,2})?')]],
	 cgst:[data.cgst, [Validators.required, Validators.pattern('\\d+(.\\d{1,2})?')]],
	 igst:[data.igst, [Validators.required, Validators.pattern('\\d+(.\\d{1,2})?')]]
      }),
      error =>alert("Something Unexpected Happened, Please Try Again After Some Time or Contact Developer"));
  }

  public onSubmit(){
    this.submitDisabled = true;
    this.clientDetailsService.updateClientDetails(this.clientDetailsForm);
    this.submitDisabled = false;

  }

}
