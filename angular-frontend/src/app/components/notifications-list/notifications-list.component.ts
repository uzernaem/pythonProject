import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/models/inquiry.model';
import { InquiryService } from 'src/app/_services/inquiry.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { AddAnnouncementComponent } from '../add-announcement/add-announcement.component';
import { AnnouncementModalComponent } from '../announcement-modal/announcement-modal.component';
import { User } from 'src/app/models/user.model';
import { AddNotificationComponent } from '../add-notification/add-notification.component';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.css']
})
export class NotificationsListComponent implements OnInit {

  currentuser: User = {};
  notifications?: Notification[];
  listednotifications?: Notification[];
  search_title = '';

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  filters!: FormGroup;

  statusFilter: string[] = [];
  categoryFilter: string[] = [];

  constructor(private inquiryService: InquiryService, public dialog: MatDialog, fb: FormBuilder) { 
    this.filters = fb.group({
    });
  }

  ngOnInit(): void {
    this.retrieveNotifications();            
    this.retrieveCurrentUser();
  }

  retrieveNotifications(): void {
    this.inquiryService.getNotifications()
      .subscribe({
        next: (data) => {          
          this.notifications = data;
          this.notifications.forEach(a => (a.inquiry_created_at = new Date(a.inquiry_created_at!)));
          this.listednotifications = this.notifications;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  
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

  applyFilters() {    
    const s = new Date(this.range.value.start + this.range.value.start.getTimezoneOffset());    
    const e = new Date(this.range.value.end + this.range.value.end.getTimezoneOffset());
    this.listednotifications = this.notifications!.filter(a => ((a.inquiry_created_at! >= s) && (a.inquiry_created_at! <= e)));
  }

  newInquiryDialog(id?: number) {
    const dialogRef = this.dialog.open(NotificationModalComponent, {
      data: {
        id: id,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.retrieveNotifications();
      console.log(`Dialog result: ${result}`);
    });
  }

  addInquiryDialog() {
    const dialogRef = this.dialog.open(AddNotificationComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.retrieveNotifications();
      console.log(`Dialog result: ${result}`);
    });
  }

  retrieveCurrentUser(): void {
    this.inquiryService.getUser()
      .subscribe({
        next: (data) => {
          this.currentuser = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}