import { Component, OnInit } from '@angular/core';
import { Inquiry } from 'src/app/models/inquiry.model';
import { InquiryService } from 'src/app/services/inquiry.service';

@Component({
  selector: 'app-inquiries-list',
  templateUrl: './inquiries-list.component.html',
  styleUrls: ['./inquiries-list.component.css']
})
export class InquiriesListComponent implements OnInit {

  inquiries?: Inquiry[];
  currentInquiry: Inquiry = {};
  currentIndex = -1;
  inquiry_title = '';

  constructor(private inquiryService: InquiryService) { }

  ngOnInit(): void {
    this.retrieveInquiries();
  }

  retrieveInquiries(): void {
    this.inquiryService.getAll()
      .subscribe({
        next: (data) => {
          this.inquiries = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveInquiries();
    this.currentInquiry = {};
    this.currentIndex = -1;
  }

  setActiveInquiry(inquiry: Inquiry, index: number): void {
    this.currentInquiry = inquiry;
    this.currentIndex = index;
  }

  removeAllInquiries(): void {
    this.inquiryService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentInquiry = {};
    this.currentIndex = -1;
    this.inquiryService.findByTitle(this.inquiry_title)
      .subscribe({
        next: (data) => {
          this.inquiries = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
