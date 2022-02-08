import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { InquiryService } from 'src/app/_services/inquiry.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { serverUrl } from 'src/app/_services/baseurl';
import { jsDocComment } from '@angular/compiler';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  currentUser?: User;
  profileForm!: FormGroup;
  submitted: boolean = false;
  constructor(private token: TokenStorageService, protected inquiryService: InquiryService) { }

  retrieveCurrentUser(): void {
    this.inquiryService.getUser()
      .subscribe({
        next: (data) => {
          data.photo_url = serverUrl.slice(0, -1) + data.photo?.file;
          this.profileForm.controls['first_name'].setValue(data.first_name);
          this.profileForm.controls['last_name'].setValue(data.last_name);
          this.profileForm.controls['phone_number'].setValue(data.phone_number);
          this.profileForm.controls['email'].setValue(data.email);
          this.currentUser = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateProfile(): void {
    const data = {
      first_name: this.profileForm.value.first_name,
      last_name: this.profileForm.value.last_name,
      phone_number: this.profileForm.value.phone_number,
      email: this.profileForm.value.email
    };
    this.inquiryService.updateUser(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      phone_number: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
      });
    this.retrieveCurrentUser();
  }
}