import { Component, Input, OnInit, Output } from '@angular/core';
import { InquiryService } from 'src/app/_services/inquiry.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Inquiry, ToDoCategory, ToDoStatus } from 'src/app/models/inquiry.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-inquiry-details',
  templateUrl: './inquiry-details.component.html',
  styleUrls: ['./inquiry-details.component.css']
})
export class InquiryDetailsComponent implements OnInit {

  users?: User[];
  user_name?: string;
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

  @Input() currentInquiry: Inquiry = {
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

  constructor(
    private inquiryService: InquiryService,
    private route: ActivatedRoute,
    private router: Router) { }

    ngOnInit(): void {
      if (!this.viewMode) {
        this.message = '';
        this.retrieveUsers();
        this.getInquiry(this.route.snapshot.params["id"]);
      }
    }

    getInquiry(id: string): void {
      this.inquiryService.get(id)
        .subscribe({
          next: (data) => {
            this.currentInquiry = data;
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

    // updatePublished(status: boolean): void {
    //   const data = {
    //     title: this.currentTutorial.title,
    //     description: this.currentTutorial.description,
    //     published: status
    //   };
  
    //   this.message = '';
  
    //   this.tutorialService.update(this.currentTutorial.id, data)
    //     .subscribe({
    //       next: (res) => {
    //         console.log(res);
    //         this.currentTutorial.published = status;
    //         this.message = res.message ? res.message : 'The status was updated successfully!';
    //       },
    //       error: (e) => console.error(e)
    //     });
    // }

    updateInquiry(): void {
      this.message = '';
  
      this.inquiryService.update(this.currentInquiry.inquiry_id, this.currentInquiry)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.message = res.message ? res.message : 'Заявка обновлена!';
          },
          error: (e) => console.error(e)
        });
    }

    deleteInquiry(): void {
      this.inquiryService.delete(this.currentInquiry.inquiry_id)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.router.navigate(['/inquiries']);
          },
          error: (e) => console.error(e)
        });
    }

}
