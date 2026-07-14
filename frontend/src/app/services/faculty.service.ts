import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Faculty } from '../models/faculty.model';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  private apiUrl = 'http://localhost:8080/api/faculty'; // Note the endpoint

  constructor(private http: HttpClient) { }

  /** Fetches all faculty members */
  getFaculty(): Observable<Faculty[]> {
    return this.http.get<Faculty[]>(this.apiUrl);
  }

  /** Fetches a single faculty member by ID */
  getFacultyMember(id: number): Observable<Faculty> {
    return this.http.get<Faculty>(`${this.apiUrl}/${id}`);
  }

  /** Creates a new faculty member */
  createFacultyMember(faculty: Faculty): Observable<Faculty> {
    return this.http.post<Faculty>(this.apiUrl, faculty);
  }

  /** Updates an existing faculty member */
  updateFacultyMember(id: number, faculty: Faculty): Observable<Faculty> {
    return this.http.put<Faculty>(`${this.apiUrl}/${id}`, faculty);
  }

  /** Deletes a faculty member by ID */
  deleteFacultyMember(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}