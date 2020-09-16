import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
//import { ClaimStatusComponent } from './claim-status/claim-status.component';
import { UploadFileService } from  '../../app/upload-file.service';

@Component({
  selector: 'app-claim-details',
  templateUrl: './claim-details.component.html',
  styleUrls: ['./claim-details.component.css']
})
export class ClaimDetailsComponent implements OnInit {
  
  status:string;
  constructor(private router: Router, private uploadFileService: UploadFileService) { }
  
  ngOnInit(): void {
    this.uploadFileService.sharedMessage.subscribe(status => this.status = status)
  }
 
  
  gotoHome(){
    this.router.navigate(['/status']);  
}

}
