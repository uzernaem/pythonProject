import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InquiriesListComponent } from './components/inquiries-list/inquiries-list.component';
import { InquiryDetailsComponent } from './components/inquiry-details/inquiry-details.component';
import { AddInquiryComponent } from './components/add-inquiry/add-inquiry.component';

const routes: Routes = [
  { path: '', redirectTo: 'todos', pathMatch: 'full' },
  { path: 'todos', component: InquiriesListComponent },
  { path: 'todos/:id', component: InquiryDetailsComponent },
  { path: 'add', component: AddInquiryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
