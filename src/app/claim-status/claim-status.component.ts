import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter  } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';  
import { catchError, map } from 'rxjs/operators';  
import { UploadFileService } from  '../../app/upload-file.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-claim-status',
  templateUrl: './claim-status.component.html',
  styleUrls: ['./claim-status.component.css']
})
export class ClaimStatusComponent implements OnInit {
  isShown: boolean = false ;
  status: string;
  @Output() messageEvent = new EventEmitter<string>();

  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];

  constructor(private uploadService: UploadFileService, private router: Router) {
  }

  ngOnInit(): void {
    this.uploadService.sharedMessage.subscribe(status => this.status = status)
  }
  uploadFile(file) {  
    
    const formData = new FormData();  
    formData.append('file', file.data);  
    file.inProgress = true;  
    this.uploadService.upload(formData).pipe(  
      map(event => {  
        switch (event.type) {  
          case HttpEventType.UploadProgress:  
            file.progress = Math.round(event.loaded * 100 / event.total);  
            break;  
          case HttpEventType.Response:  
            return event;  
        }  
      }),  
      catchError((error: HttpErrorResponse) => {  
        file.inProgress = false;  
        return of(`${file.data.name} upload failed.`);  
      })).subscribe((event: any) => {  
        if (typeof (event) === 'object') {  
          console.log(event.body);  
          this.isShown = false;
          console.log(this.isShown);
          this.uploadService.nextMessage("completed")
          
        }  
      });  
  }
  private uploadFiles() {  
    console.log(this.isShown);
    this.isShown = ! this.isShown;
    this.fileUpload.nativeElement.value = '';  
    this.files.forEach(file => {  
      this.uploadFile(file);  
    });  
}
onClick() {  
  
  const fileUpload = this.fileUpload.nativeElement;fileUpload.onchange = () => {  
  for (let index = 0; index < fileUpload.files.length; index++)  
  {  
   const file = fileUpload.files[index];  
   this.files.push({ data: file, inProgress: false, progress: 0});  
   console.log(this.files);
  }  
    this.uploadFiles();  
  };  
  fileUpload.click();  
}

  removeSelectedFile(index) {
    this.files.splice(index, 1);
   }
   goBack(){
    this.router.navigate(['/']);
   }
}
