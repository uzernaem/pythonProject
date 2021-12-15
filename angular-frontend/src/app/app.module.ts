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
import { MatInputModule } from '@angular/material/input';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';


const modules = [
  MatFormFieldModule,
  MatInputModule,
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
    InquiriesListComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [modules],
  exports: [modules],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
