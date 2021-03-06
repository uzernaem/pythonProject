import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToDo, InquiryCategory, Announcement, Notification, Poll, Vote, Info } from '../models/inquiry.model';
import { User } from '../models/user.model';
import { serverUrl } from '../_services/baseurl';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {

  upload(formData: FormData) {    
    return this.http.post<any>(serverUrl + 'files', formData);
  }

  updatePhoto(formData: FormData, id: any) {    
    return this.http.put<any>(`${serverUrl + 'files'}/${id}`, formData);
  }

  createPhoto(formData: FormData, id: any) {
    return this.http.post<any>(`${serverUrl + 'photo'}/${id}`, formData);
  }


  getInfo() {
    return this.http.get<Info[]>(serverUrl + 'info');
  }

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {    
    return this.http.get<User[]>(serverUrl + 'users');
  }

  getUser(): Observable<User> {    
    return this.http.get<User>(serverUrl + 'user');
  }

  updateUser(data: any): Observable<User> {
    return this.http.put(serverUrl + 'user', data);
  }

  getToDos(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(serverUrl + 'todos');
  }

  getAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(serverUrl + 'announcements');
  }

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(serverUrl + 'notifications');
  }

  getPolls(): Observable<Poll[]> {
    return this.http.get<Poll[]>(serverUrl + 'polls');
  }

  // getCategories(): Observable<ToDoCategory[]> {
  //   return this.http.get<ToDoCategory[]>(categoriesUrl);
  // }

  getCategory(id: any): Observable<InquiryCategory> {
    return this.http.get(`${serverUrl + 'categories'}/${id}`);
  }

  getToDo(id: any): Observable<ToDo> {
    return this.http.get(`${serverUrl + 'todos'}/${id}`);
  }

  getAnnouncement(id: any): Observable<Announcement> {
    return this.http.get(`${serverUrl + 'announcements'}/${id}`);
  }

  getNotification(id: any): Observable<Notification> {
    return this.http.get(`${serverUrl + 'notifications'}/${id}`);
  }

  getPoll(id: any): Observable<Poll> {
    return this.http.get(`${serverUrl + 'polls'}/${id}`);
  }

  createComment(data: any, id: any): Observable<any> {
    return this.http.post(`${serverUrl + 'comments'}/${id}`, data);
  }

  createToDo(data: any): Observable<any> {
    return this.http.post(serverUrl + 'todos', data);
  }

  updateToDo(id: any, data: any): Observable<any> {
    return this.http.put(`${serverUrl + 'todos'}/${id}`, data);
  }

  updateAnnouncement(id: any, data: any): Observable<any> {
    return this.http.put(`${serverUrl + 'announcements'}/${id}`, data);
  }
  
  updateNotification(id: any, data: any): Observable<any> {
    return this.http.put(`${serverUrl + 'notifications'}/${id}`, data);
  }

  deleteToDo(id: any): Observable<any> {
    return this.http.delete(`${serverUrl + 'todos'}/${id}`);
  }

  deleteAnnouncement(id: any): Observable<any> {
    return this.http.delete(`${serverUrl + 'announcements'}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(serverUrl + 'todos');
  }

  findByTitle(title: any): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(`${serverUrl + 'todos'}?title=${title}`);
  }

  createAnnouncement(data: any): Observable<Announcement> {
    return this.http.post<Announcement>(serverUrl + 'announcements', data);
  }
  
  createNotification(data: any): Observable<Notification> {
    return this.http.post<Notification>(serverUrl + 'notifications', data);
  }

  createPoll(data: any): Observable<Poll> {
    return this.http.post<Poll>(serverUrl + 'polls', data);
  }

  vote(data: any): Observable<any> {
    return this.http.post(serverUrl + 'vote', data);
  }
}
