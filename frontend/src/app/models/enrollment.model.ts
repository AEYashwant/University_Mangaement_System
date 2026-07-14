import { Student } from './student.model';
import { Course } from './course.model';

export interface Enrollment {
  id?: number;
  student: Student;
  course: Course;
  enrollmentDate: string;
  grade?: string | null;
}

export interface EnrollmentRequest {
  studentId: number;
  courseId: number;
  grade?: string;
}

export interface EnrollmentUpdateRequest {
  grade?: string | null;
}

export interface EnrollmentSearchFilters {
  studentName?: string;
  courseCode?: string;
  dateFrom?: string;
  dateTo?: string;
}
