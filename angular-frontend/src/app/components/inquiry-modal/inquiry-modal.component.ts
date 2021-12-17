import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { InquiryService } from 'src/app/_services/inquiry.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDo, Comment, ToDoCategory, ToDoStatus } from 'src/app/models/inquiry.model';
import { User } from 'src/app/models/user.model';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-inquiry-modal',
  templateUrl: './inquiry-modal.component.html',
  styleUrls: ['./inquiry-modal.component.css']
})

export class InquiryModalComponent implements OnInit {

  //id?: number;
  users: User[] = [];
  currentuser?: User;
  comments!: Comment[];
  comment: Comment = {
    comment_text: ''
  };

  todostatuses: ToDoStatus[] = [
    {"status_id": "n", "status_name": "Новая"},
    {"status_id": "w", "status_name": "В работе"},
    {"status_id": "r", "status_name": "На проверке"},
    {"status_id": "c", "status_name": "Завершена"}
  ];

  @Input() currentCategory: ToDoCategory = {
    category_id: 0,
    category_name: ''    
  };

  @Input() viewMode = false;

  @Input() currentToDo: ToDo = {
    inquiry_title: '',
    inquiry_text: '',
    inquiry_creator: 0,
    todo_category: '',
    todo_priority: '',
    todo_status: '',
    todo_priority_name: '',
    todo_status_name: '',
    todo_category_name: ''
  };

  message = '';

  constructor(@Inject(MAT_DIALOG_DATA) 
    public data: DialogData,
    private inquiryService: InquiryService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorage: TokenStorageService) { }

    ngOnInit(): void {
      if (!this.viewMode) {
        this.message = '';
        this.retrieveUsers();
        this.getInquiry(this.data.id);
        this.retrieveComments(this.data.id);
      }
    }

    getInquiry(id: number): void {
      this.inquiryService.get(id)
        .subscribe({
          next: (data) => {
            this.currentToDo = data;
            console.log(data);
          },
          error: (e) => console.error(e)
        });
    }

    retrieveUsers(): void {
      this.inquiryService.getUsers()
        .subscribe({
          next: (data) => {
            this.users = data;
            console.log(data);
          },
          error: (e) => console.error(e)
        });
    }

    retrieveComments(id: number): void {
      this.inquiryService.getComments(id)
        .subscribe({
          next: (data) => {
            this.comments = data.sort((a,b) => b.comment_id! - a.comment_id!);
            console.log(data);
          },
          error: (e) => console.error(e)
        });
    }

    saveComment(): void {
      this.currentuser = this.tokenStorage.getUser();
      const data = {
        comment_text: this.comment.comment_text,
        inquiry: this.currentToDo.inquiry_id,
        comment_creator: this.currentuser?.id
      };
  
      this.inquiryService.createComment(data, this.currentToDo.inquiry_id)
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (e) => console.error(e)
        });
      window.location.reload();
    }

    getUser(id: any): any {
      return this.users.find(x => (x.id == id))
    }

    updateInquiry(): void {
      this.message = '';
  
      this.inquiryService.update(this.currentToDo.inquiry_id, this.currentToDo)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.message = res.message ? res.message : 'Заявка обновлена!';
          },
          error: (e) => console.error(e)
        });
        this.retrieveComments(this.data.id);
    }

    deleteInquiry(): void {
      this.inquiryService.delete(this.currentToDo.inquiry_id)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.router.navigate(['/inquiries']);
          },
          error: (e) => console.error(e)
        });
    }

}