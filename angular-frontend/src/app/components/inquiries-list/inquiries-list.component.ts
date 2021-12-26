import { Component, OnInit } from '@angular/core';
import { ToDo, InquiryCategory } from 'src/app/models/inquiry.model';
import { User } from 'src/app/models/user.model';
import { InquiryService } from 'src/app/_services/inquiry.service';
import { MatDialog } from '@angular/material/dialog';
import { InquiryModalComponent } from '../inquiry-modal/inquiry-modal.component';
import { AddInquiryComponent } from '../add-inquiry/add-inquiry.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-inquiries-list',
  templateUrl: './inquiries-list.component.html',
  styleUrls: ['./inquiries-list.component.css']
})

export class InquiriesListComponent implements OnInit {

  todos?: ToDo[];
  //users?: User[];
  listedtodos?: ToDo[];
  categories: InquiryCategory[] = [];
  // currentToDo: ToDo = {};
  // currentCategory: ToDoCategory = {};
  // currentIndex = -1;
  search_title = '';

  filters!: FormGroup;

  statusFilter: string[] = [];
  categoryFilter: string[] = [];
  priorityFilter: string[] = [];

  constructor(private inquiryService: InquiryService, public dialog: MatDialog, fb: FormBuilder) { 
    this.filters = fb.group({
      new: true,
      worked: true,
      revision: true,
      completed: false,
      category1: true,
      category2: true,
      category3: true,
      category4: true,
      category5: true,
      priority0: true,
      priority1: true,
      priority2: true,
      priority3: true
    });
  }

  ngOnInit(): void {
    this.statusFilter = ['n', 'w', 'r'];
    this.categoryFilter = ['1', '2', '3', '4', '5'];
    this.priorityFilter = ['0', '1', '2', '3'];
    this.retrieveInquiries();
    //this.retrieveUsers();
  }

  retrieveInquiries(): void {
    this.inquiryService.getToDos()
      .subscribe({
        next: (data) => {
          this.todos = data;
          this.listedtodos = data.filter(x => (this.statusFilter.includes(x.todo_status!))).filter(x =>
            (this.categoryFilter.includes(x.todo_category!))).filter(x => 
             (this.priorityFilter.includes(x.todo_priority!))).filter(x => (x.inquiry_title?.includes(this.search_title)));
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  // retrieveUsers(): void {
  //   this.inquiryService.getUsers()
  //     .subscribe({
  //       next: (data) => {
  //         this.users = data;
  //         console.log(data);
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }

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

  // setActiveInquiry(todo: ToDo, index: number): void {
  //   this.currentToDo = todo;
  //  // this.currentCategory = this.categories.find(x => (x.category_id == todo.todo_category));
  //   this.currentIndex = index;
  // }
  
  setStatusFilter(event: MatCheckboxChange): void{
    if(event.source.checked) {
      this.statusFilter.push(event.source.value);
    }
    else {
      this.statusFilter = this.statusFilter.filter(x => x != event.source.value);
    }
    this.applyFilters();
  }

  setCategoryFilter(event: MatCheckboxChange): void{
    if(event.source.checked) {
      this.categoryFilter.push(event.source.value);
    }
    else {
      this.categoryFilter = this.categoryFilter.filter(x => x != event.source.value);
    }
    this.applyFilters();
  }

  setPriorityFilter(event: MatCheckboxChange): void{
    if(event.source.checked) {
      this.priorityFilter.push(event.source.value);
    }
    else {
      this.priorityFilter = this.priorityFilter.filter(x => x != event.source.value);
    }
    this.applyFilters();
  }

  applyFilters() {
    this.listedtodos = this.todos?.filter(x => (this.statusFilter.includes(x.todo_status!))).filter(x =>
       (this.categoryFilter.includes(x.todo_category!))).filter(x => 
        (this.priorityFilter.includes(x.todo_priority!))).filter(x => (x.inquiry_title?.includes(this.search_title)));
  }

  newInquiryDialog(id?: number) {
    const dialogRef = this.dialog.open(InquiryModalComponent, {
      data: {
        id: id,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.retrieveInquiries();
      console.log(`Dialog result: ${result}`);
    });
  }

  addInquiryDialog() {
    const dialogRef = this.dialog.open(AddInquiryComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.retrieveInquiries();
      console.log(`Dialog result: ${result}`);
    });
  }

}

