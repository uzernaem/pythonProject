import { Component, OnInit } from '@angular/core';
import { Inquiry } from 'src/app/models/inquiry.model';
import { InquiryService } from 'src/app/services/inquiry.service';

interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-inquiry',
  templateUrl: './add-inquiry.component.html',
  styleUrls: ['./add-inquiry.component.css']
})

export class AddInquiryComponent implements OnInit {
  selectedValue: string = '';

  categories: Category[] = [
    {value: '1', viewValue: 'Сантехника'},
    {value: '2', viewValue: 'Электрика'},
    {value: '3', viewValue: 'Ремонтные работы'},
    {value: '4', viewValue: 'Лифт'},
    {value: '5', viewValue: 'Общедомовая территория'},
  ];

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
