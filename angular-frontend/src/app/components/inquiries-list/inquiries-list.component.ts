import { Component, OnInit } from '@angular/core';
import { ToDo, ToDoCategory } from 'src/app/models/inquiry.model';
import { InquiryService } from 'src/app/_services/inquiry.service';

@Component({
  selector: 'app-inquiries-list',
  templateUrl: './inquiries-list.component.html',
  styleUrls: ['./inquiries-list.component.css']
})
export class InquiriesListComponent implements OnInit {

  todos?: ToDo[];
  categories: ToDoCategory[] = [];
  currentToDo: ToDo = {};
  currentCategory: ToDoCategory = {};
  currentIndex = -1;
  inquiry_title = '';

  constructor(private inquiryService: InquiryService) { }

  ngOnInit(): void {
    this.retrieveInquiries();
    //this.retrieveCategories();
  }

  retrieveInquiries(): void {
    this.inquiryService.getToDos()
      .subscribe({
        next: (data) => {
          this.todos = data;
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
    this.currentToDo = {};
    this.currentCategory = {};
    this.currentIndex = -1;
  }

  setActiveInquiry(todo: ToDo, index: number): void {
    this.currentToDo = todo;
   // this.currentCategory = this.categories.find(x => (x.category_id == todo.todo_category));
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
    this.currentToDo = {};
    this.currentIndex = -1;
    this.inquiryService.findByTitle(this.inquiry_title)
      .subscribe({
        next: (data) => {
          this.todos = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
