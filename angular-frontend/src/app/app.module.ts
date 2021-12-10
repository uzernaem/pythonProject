import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddInquiryComponent } from './components/add-inquiry/add-inquiry.component';
import { InquiryDetailsComponent } from './components/inquiry-details/inquiry-details.component';
import { InquiriesListComponent } from './components/inquiries-list/inquiries-list.component';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

const modules = [
  MatFormFieldModule,
  MatSelectModule,
  BrowserAnimationsModule,
  BrowserModule,
  AppRoutingModule,
  RouterModule,
  FormsModule,
  HttpClientModule,
];

@NgModule({
  declarations: [
    AppComponent,
    AddInquiryComponent,
    InquiryDetailsComponent,
    InquiriesListComponent
  ],
  imports: [modules],
  exports: [modules],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
