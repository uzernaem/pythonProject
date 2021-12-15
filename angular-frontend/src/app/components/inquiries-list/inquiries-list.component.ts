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
  listedtodos?: ToDo[];
  categories: ToDoCategory[] = [];
  currentToDo: ToDo = {};
  currentCategory: ToDoCategory = {};
  currentIndex = -1;
  search_title = '';

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
          this.listedtodos = data;
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

  searchTitle(): void {
    if (this.search_title != '')
      this.listedtodos = this.listedtodos?.filter(x => (x.inquiry_title?.includes(this.search_title)));
    else this.listedtodos = this.todos;
  }
}
