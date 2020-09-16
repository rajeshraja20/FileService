import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';  
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  
  SERVER_URL: string = "https://file.io/";  
  constructor(private httpClient: HttpClient) { }

  private status = new BehaviorSubject('Not received');
  sharedMessage = this.status.asObservable();

  
  public upload(formData: any) {

    return this.httpClient.post<any>(this.SERVER_URL, formData, {  
        reportProgress: true,  
        observe: 'events'  
      }); 
  }

  nextMessage(status: string) {
    this.status.next(status);
    console.log(this.status);
  }
}
