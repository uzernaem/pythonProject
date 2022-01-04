import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { InquiryService } from 'src/app/_services/inquiry.service';

@Component({
  selector: 'app-base-inquiry',
  templateUrl: './base-inquiry.component.html',
  styleUrls: ['./base-inquiry.component.css']
})
export class BaseInquiryComponent {  
  public currentuser?: User;
  constructor(protected inquiryService: InquiryService) { }

  retrieveCurrentUser(): void {
    this.inquiryService.getUser()
      .subscribe({
        next: (data) => {
          this.currentuser = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
}
