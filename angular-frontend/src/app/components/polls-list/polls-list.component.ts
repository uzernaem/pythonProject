import { Component, OnInit } from '@angular/core';
import { Poll } from 'src/app/models/inquiry.model';
import { InquiryService } from 'src/app/_services/inquiry.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { AddAnnouncementComponent } from '../add-announcement/add-announcement.component';
import { AnnouncementModalComponent } from '../announcement-modal/announcement-modal.component';

@Component({
  selector: 'app-polls-list',
  templateUrl: './polls-list.component.html',
  styleUrls: ['./polls-list.component.css']
})
export class PollsListComponent implements OnInit {

  polls?: Poll[];
  listedpolls?: Poll[];
  search_title = '';

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(private inquiryService: InquiryService, public dialog: MatDialog) { }

  ngOnInit(): void {
    var s = new Date();
    var e = new Date();
    s.setDate(s.getMonth()-10);
    this.range.patchValue({start: s, end: e})
    this.retrievePolls();
  }

  retrievePolls(): void {
    const s = new Date(this.range.value.start + this.range.value.start.getTimezoneOffset());    
    const e = new Date(this.range.value.end + this.range.value.end.getTimezoneOffset());
    this.inquiryService.getPolls()
      .subscribe({
        next: (data) => {
          this.polls = data;
          this.polls.forEach(a => (a.inquiry_created_at = new Date(a.inquiry_created_at!)));
          this.applyFilters();
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  applyFilters() {
    const s = new Date(this.range.value.start + this.range.value.start.getTimezoneOffset());    
    const e = new Date(this.range.value.end + this.range.value.end.getTimezoneOffset());
    this.listedpolls = this.polls?.filter(x => (x.inquiry_title?.includes(this.search_title))).filter(x => ((x.inquiry_created_at! >= s) && (x.inquiry_created_at! <= e)));
  }

  newInquiryDialog(id?: number) {
    const dialogRef = this.dialog.open(AnnouncementModalComponent, {
      data: {
        id: id,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.retrievePolls();
      console.log(`Dialog result: ${result}`);
    });
  }

  addInquiryDialog() {
    const dialogRef = this.dialog.open(AddAnnouncementComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.retrievePolls();
      console.log(`Dialog result: ${result}`);
    });
  }

}