import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { InquiryService } from 'src/app/_services/inquiry.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDo, Comment, ToDoCategory, ToDoStatus } from 'src/app/models/inquiry.model';
import { User } from 'src/app/models/user.model';
import { TokenStorageService } from 'src/app/_services/token-storage.service';


@Component({
  selector: 'app-add-inquiry-modal',
  templateUrl: './add-inquiry-modal.component.html',
  styleUrls: ['./add-inquiry-modal.component.css']
})

export class AddInquiryModalComponent implements OnInit {
  selectedValue: string = '';
  currentuser?: User;
  todocategories: ToDoCategory[] = [
    {"category_id": 1, "category_name": "Сантехника"},
    {"category_id": 2, "category_name": "Электрика"},
    {"category_id": 3, "category_name": "Ремонтные работы"},
    {"category_id": 4, "category_name": "Лифт"},
    {"category_id": 5, "category_name": "Общедомовая территория"}
  ];

  todo: ToDo = { }

  submitted = false;

  constructor(private inquiryService: InquiryService,
    private tokenStorage: TokenStorageService) { }

  ngOnInit(): void { 
    //this.inquiryService.getCategories().subscribe(cats => {this.categories = cats as ToDoCategory[]})
   }

  saveInquiry(): void {    
    this.currentuser = this.tokenStorage.getUser();
    const data = {
      inquiry_creator: this.currentuser.id,
      inquiry_title: this.todo.inquiry_title,
      inquiry_text: this.todo.inquiry_text,
      todo_category: this.todo.todo_category
    };

    this.inquiryService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
    window.location.reload();
  }

  newInquiry(): void {
    this.submitted = false;
    this.todo = {
      inquiry_title: '',
      inquiry_text: '',
      inquiry_creator: 0,
      todo_category: 'Сантехника',
      todo_priority: '',
      todo_status: ''
    };
  }
}