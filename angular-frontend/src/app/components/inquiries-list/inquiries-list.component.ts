import { Component, OnInit } from '@angular/core';
import { Inquiry, ToDoCategory } from 'src/app/models/inquiry.model';
import { InquiryService } from 'src/app/services/inquiry.service';

@Component({
  selector: 'app-inquiries-list',
  templateUrl: './inquiries-list.component.html',
  styleUrls: ['./inquiries-list.component.css']
})
export class InquiriesListComponent implements OnInit {

  inquiries?: Inquiry[];
  categories: ToDoCategory[] = [];
  currentInquiry: Inquiry = {};
  currentCategory: ToDoCategory = {};
  currentIndex = -1;
  inquiry_title = '';

  constructor(private inquiryService: InquiryService) { }

  ngOnInit(): void {
    this.retrieveInquiries();
    //this.retrieveCategories();
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

  // retrieveCategories(): void {
  //   this.inquiryService.getCategories()
  //   .subscribe({
  //     next: (data) => {
  //       this.categories = data;
  //       console.log(data);
  //     },
  //     error: (e) => console.error(e)
  //   });
  //}

  refreshList(): void {
    this.retrieveInquiries();
    this.currentInquiry = {};
    this.currentCategory = {};
    this.currentIndex = -1;
  }

  setActiveInquiry(inquiry: Inquiry, index: number): void {
    this.currentInquiry = inquiry;
   // this.currentCategory = this.categories.find(x => (x.category_id == inquiry.todo_category));
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
