import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InquiriesListComponent } from './components/inquiries-list/inquiries-list.component';
import { InquiryDetailsComponent } from './components/inquiry-details/inquiry-details.component';
import { AddInquiryComponent } from './components/add-inquiry/add-inquiry.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'todos', pathMatch: 'full' },
  { path: 'todos', component: InquiriesListComponent },
  { path: 'todos/:id', component: InquiryDetailsComponent },
  { path: 'add', component: AddInquiryComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
