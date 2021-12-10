import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inquiry } from '../models/inquiry.model';

const baseUrl = 'http://127.0.0.1:8000/inquiries/api/todos';


@Injectable({
  providedIn: 'root'
})
export class InquiryService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Inquiry[]> {
    return this.http.get<Inquiry[]>(baseUrl);
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
