import { Component, OnInit } from '@angular/core';
import { Inquiry, ToDoCategory } from 'src/app/models/inquiry.model';
import { InquiryService } from 'src/app/services/inquiry.service';

@Component({
  selector: 'app-add-inquiry',
  templateUrl: './add-inquiry.component.html',
  styleUrls: ['./add-inquiry.component.css']
})

export class AddInquiryComponent implements OnInit {
  selectedValue: string = '';

 categories?: ToDoCategory[];

  inquiry: Inquiry = {
    inquiry_title: '',
    inquiry_text: '',
    inquiry_creator: 0,
    todo_category: '',
    todo_priority: '',
    todo_status: ''
  };
  submitted = false;

  constructor(private inquiryService: InquiryService) { }

  ngOnInit(): void { 
    this.inquiryService.getCategories().subscribe(cats => {this.categories = cats as ToDoCategory[]})
   }

  saveInquiry(): void {
    const data = {
      inquiry_title: this.inquiry.inquiry_title,
      inquiry_text: this.inquiry.inquiry_text,
      todo_category: this.inquiry.todo_category
    };

    this.inquiryService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newInquiry(): void {
    this.submitted = false;
    this.inquiry = {
      inquiry_title: '',
      inquiry_text: '',
      inquiry_creator: 0,
      todo_category: '',
      todo_priority: '',
      todo_status: ''
    };
  }
}
