import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InquiriesListComponent } from './components/inquiries-list/inquiries-list.component';
import { InquiryDetailsComponent } from './components/inquiry-details/inquiry-details.component';
import { AddInquiryComponent } from './components/add-inquiry/add-inquiry.component';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

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
