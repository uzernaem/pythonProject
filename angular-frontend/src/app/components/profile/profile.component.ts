import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { InquiryService } from 'src/app/_services/inquiry.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { serverUrl } from 'src/app/_services/baseurl';
import { jsDocComment } from '@angular/compiler';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  currentUser?: User;

  constructor(private token: TokenStorageService, protected inquiryService: InquiryService) { }

  retrieveCurrentUser(): void {
    this.inquiryService.getUser()
      .subscribe({
        next: (data) => {
          data.photo_url = serverUrl.slice(0, -1) + data.photo?.file;
          this.currentUser = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  ngOnInit(): void {
    this.retrieveCurrentUser();
  }
}