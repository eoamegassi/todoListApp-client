import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Task} from './task.model';
import {catchError, retry} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiURL = '/api/tasks';
  onTaskAdded = new EventEmitter<Task>();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiURL)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }


  getTask(id): Observable<Task> {
    return this.http.get<Task>(this.apiURL + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }


  createTask(task): Observable<Task> {
    return this.http.post<Task>(this.apiURL, JSON.stringify(task), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }


  updateTask(task): Observable<Task> {
    return this.http.put<Task>(this.apiURL, JSON.stringify(task), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }


  deleteTask(id) {
    return this.http.delete<Task>(this.apiURL + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

// Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
// Get client-side error
      errorMessage = error.error.message;
    } else {
// Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
