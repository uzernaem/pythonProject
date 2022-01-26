import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InquiryService } from 'src/app/_services/inquiry.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { DialogData } from '../announcement-modal/announcement-modal.component';
import { BaseInquiryComponent } from '../base-inquiry/base-inquiry.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Poll, Vote, VoteOption } from 'src/app/models/inquiry.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-poll-modal',
  templateUrl: './poll-modal.component.html',
  styleUrls: ['./poll-modal.component.css']
})
export class PollModalComponent  extends BaseInquiryComponent implements OnInit {

  @Input() viewMode = false;

  @Input() poll: Poll = {};

  vote_options: VoteOption[] = [];
  votes: Vote[] = [];
  
  constructor(@Inject(MAT_DIALOG_DATA) 
    public data: DialogData,
    private router: Router,
    private tokenStorage: TokenStorageService,
    inquiryService: InquiryService) {
    super(inquiryService);
  }

  ngOnInit(): void {
    this.inquiryForm = new FormGroup({ });
  if (!this.viewMode) {      
    this.retrieveCurrentUser();
    this.getInquiry(this.data.id);
    }
  }

  getInquiry(id: number): void {
    this.inquiryService.getPoll(id)
      .subscribe({
        next: (data) => {
          this.poll = data;
          this.vote_options = data.vote_options!;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
