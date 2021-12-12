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

  todocategories: ToDoCategory[] = [
    {"category_id": 1, "category_name": "Сантехника"},
    {"category_id": 2, "category_name": "Электрика"},
    {"category_id": 3, "category_name": "Ремонтные работы"},
    {"category_id": 4, "category_name": "Лифт"},
    {"category_id": 5, "category_name": "Общедомовая территория"}
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
    //this.inquiryService.getCategories().subscribe(cats => {this.categories = cats as ToDoCategory[]})
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
