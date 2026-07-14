import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Enrollment,
  EnrollmentRequest,
  EnrollmentSearchFilters,
  EnrollmentUpdateRequest
} from '../models/enrollment.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = 'http://localhost:8080/api/enrollments';

  constructor(private http: HttpClient) { }

  /** Fetches all enrollments */
  getEnrollments(filters: EnrollmentSearchFilters = {}): Observable<Enrollment[]> {
    let params = new HttpParams();

    if (filters.studentName?.trim()) {
      params = params.set('studentName', filters.studentName.trim());
    }

    if (filters.courseCode?.trim()) {
      params = params.set('courseCode', filters.courseCode.trim());
    }

    if (filters.dateFrom) {
      params = params.set('dateFrom', filters.dateFrom);
    }

    if (filters.dateTo) {
      params = params.set('dateTo', filters.dateTo);
    }

    return this.http.get<Enrollment[]>(this.apiUrl, { params });
  }

  /** Creates a new enrollment (uses DTO: EnrollmentRequest) */
  createEnrollment(request: EnrollmentRequest): Observable<Enrollment> {
    return this.http.post<Enrollment>(this.apiUrl, request);
  }

  /** Updates only the grade on an enrollment */
  updateEnrollmentGrade(id: number, request: EnrollmentUpdateRequest): Observable<Enrollment> {
    return this.http.put<Enrollment>(`${this.apiUrl}/${id}`, request);
  }

  /** Deletes an enrollment by ID */
  deleteEnrollment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
