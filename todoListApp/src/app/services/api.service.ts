import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://tasklist-api-rc1k.onrender.com/api'; 

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tasks/`);
  }

  addTask(task: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tasks/`, task);
  }

  updateTask(task: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/tasks/${task.id}/`, task);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/tasks/${taskId}/`);
  }
}
