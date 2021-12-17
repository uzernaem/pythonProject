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
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InquiryModalComponent } from './components/inquiry-modal/inquiry-modal.component';
import { MatDialogModule } from '@angular/material/dialog';


const modules = [
  MatDialogModule,
  BrowserModule,
  AppRoutingModule,
  FlexLayoutModule,
  FormsModule,
  BrowserAnimationsModule,
  MatToolbarModule,
  MatInputModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatDividerModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatOptionModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatGridListModule,
  MatExpansionModule,
  MatFormFieldModule,
  RouterModule,
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
    ProfileComponent,
    InquiryModalComponent
  ],
  imports: [modules, BrowserAnimationsModule],
  exports: [modules],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
