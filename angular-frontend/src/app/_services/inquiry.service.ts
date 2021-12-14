import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToDo, ToDoCategory, Comment } from '../models/inquiry.model';
import { User } from '../models/user.model';

const baseUrl = 'http://127.0.0.1:8000/inquiries/api/';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {    
    return this.http.get<User[]>(baseUrl + 'users');
  }

  getToDos(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(baseUrl + 'todos');
  }

  // getCategories(): Observable<ToDoCategory[]> {
  //   return this.http.get<ToDoCategory[]>(categoriesUrl);
  // }

  getCategory(id: any): Observable<ToDoCategory> {
    return this.http.get(`${baseUrl + 'categories'}/${id}`);
  }

  get(id: any): Observable<ToDo> {
    return this.http.get(`${baseUrl + 'todos'}/${id}`);
  }

  getComments(id: any): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${baseUrl + 'comments'}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl + 'todos', data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl + 'todos'}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl + 'todos'}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl + 'todos');
  }

  findByTitle(title: any): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(`${baseUrl + 'todos'}?title=${title}`);
  }
}
