import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inquiry, ToDoCategory, } from '../models/inquiry.model';
import { User } from '../models/user.model';

const baseUrl = 'http://127.0.0.1:8000/inquiries/api/todos';
const userUrl = 'http://127.0.0.1:8000/inquiries/api/users';
const categoriesUrl = 'http://127.0.0.1:8000/inquiries/api/todocategories';


@Injectable({
  providedIn: 'root'
})
export class InquiryService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {    
    return this.http.get<User[]>(userUrl);
  }

  getAll(): Observable<Inquiry[]> {
    return this.http.get<Inquiry[]>(baseUrl);
  }

  // getCategories(): Observable<ToDoCategory[]> {
  //   return this.http.get<ToDoCategory[]>(categoriesUrl);
  // }

  getCategory(id: any): Observable<ToDoCategory> {
    return this.http.get(`${categoriesUrl}/${id}`);
  }

  get(id: any): Observable<Inquiry> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Inquiry[]> {
    return this.http.get<Inquiry[]>(`${baseUrl}?title=${title}`);
  }
}
