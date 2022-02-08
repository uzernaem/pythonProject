import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { InquiryService } from 'src/app/_services/inquiry.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { serverUrl } from 'src/app/_services/baseurl';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  currentUser: User = {  };
  photo?: string;

  constructor(private token: TokenStorageService, protected inquiryService: InquiryService) { }

  retrieveCurrentUser(): void {
    this.inquiryService.getUser()
      .subscribe({
        next: (data) => {
          this.currentUser = data;
          this.photo = serverUrl.slice(0, -1) + data.photo?.file
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  ngOnInit(): void {
    this.retrieveCurrentUser();
  }
}