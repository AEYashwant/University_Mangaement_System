import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../../services/enrollment.service';
import { StudentService } from '../../services/student.service';
import { CourseService } from '../../services/course.service';
import {
  Enrollment,
  EnrollmentRequest,
  EnrollmentSearchFilters,
  EnrollmentUpdateRequest
} from '../../models/enrollment.model';
import { Student } from '../../models/student.model';
import { Course } from '../../models/course.model';
import { StudentGpa } from '../../models/student-gpa.model';

@Component({
  selector: 'app-enrollment',
  standalone: false,
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {
  enrollments: Enrollment[] = [];
  students: Student[] = [];
  courses: Course[] = [];

  searchFilters: EnrollmentSearchFilters = {
    studentName: '',
    courseCode: '',
    dateFrom: '',
    dateTo: ''
  };

  selectedStudentId: number | null = null;
  selectedCourseId: number | null = null;
  newGrade = '';
  gradeOptions: string[] = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];
  editableGrades: Record<number, string> = {};
  selectedStudentGpa: StudentGpa | null = null;
  recentGpaUpdate: StudentGpa | null = null;
  isLoadingEnrollments = false;
  isSavingGradeId: number | null = null;
  errorMessage = '';

  constructor(
    private enrollmentService: EnrollmentService,
    private studentService: StudentService,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.loadInitialFormData();
    this.loadEnrollments();
  }

  loadInitialFormData(): void {
    this.studentService.getStudents().subscribe(data => this.students = data);
    this.courseService.getCourses().subscribe(data => this.courses = data);
  }

  loadEnrollments(): void {
    this.isLoadingEnrollments = true;
    this.errorMessage = '';
    this.enrollments = [];
    this.editableGrades = {};

    this.enrollmentService.getEnrollments(this.searchFilters).subscribe({
      next: (data) => {
        this.enrollments = data;
        this.editableGrades = data.reduce((accumulator, enrollment) => {
          if (enrollment.id !== undefined) {
            accumulator[enrollment.id] = enrollment.grade ?? '';
          }
          return accumulator;
        }, {} as Record<number, string>);
        this.isLoadingEnrollments = false;
      },
      error: () => {
        this.errorMessage = 'Could not fetch enrollments.';
        this.isLoadingEnrollments = false;
      }
    });
  }

  applyFilters(): void {
    this.loadEnrollments();
  }

  resetFilters(): void {
    this.searchFilters = {
      studentName: '',
      courseCode: '',
      dateFrom: '',
      dateTo: ''
    };
    this.loadEnrollments();
  }

  onSelectedStudentChange(studentId: number | null): void {
    if (studentId === null) {
      this.selectedStudentGpa = null;
      return;
    }

    this.loadStudentGpa(studentId, true);
  }

  enrollStudent(): void {
    const selectedStudentId = this.selectedStudentId;
    const selectedCourseId = this.selectedCourseId;

    if (selectedStudentId === null || selectedCourseId === null) {
      alert('Please select a student and a course.');
      return;
    }

    const request: EnrollmentRequest = {
      studentId: selectedStudentId,
      courseId: selectedCourseId,
      grade: this.newGrade || undefined
    };

    this.enrollmentService.createEnrollment(request).subscribe({
      next: () => {
        this.selectedCourseId = null;
        this.newGrade = '';
        this.loadEnrollments();
        this.loadStudentGpa(selectedStudentId, true);
      },
      error: () => {
        this.errorMessage = 'Enrollment failed. Check the selected student and course.';
      }
    });
  }

  saveGrade(enrollment: Enrollment): void {
    if (enrollment.id === undefined) {
      return;
    }

    const grade: string | null = this.editableGrades[enrollment.id] || null;
    const request: EnrollmentUpdateRequest = { grade };

    this.isSavingGradeId = enrollment.id;
    this.enrollmentService.updateEnrollmentGrade(enrollment.id, request).subscribe({
      next: (updatedEnrollment) => {
        this.isSavingGradeId = null;
        this.loadEnrollments();
        if (updatedEnrollment.student.id !== undefined) {
          this.loadStudentGpa(updatedEnrollment.student.id);
        }
      },
      error: () => {
        this.isSavingGradeId = null;
        this.errorMessage = 'Unable to update the grade.';
      }
    });
  }

  deleteEnrollment(id: number | undefined): void {
    if (id && confirm('Are you sure you want to delete this enrollment?')) {
      this.enrollmentService.deleteEnrollment(id).subscribe({
        next: () => this.loadEnrollments(),
        error: () => {
          this.errorMessage = 'Unable to delete enrollment.';
        }
      });
    }
  }

  private loadStudentGpa(studentId: number, setAsSelected = false): void {
    if (studentId === 0) {
      return;
    }

    this.studentService.getStudentGpa(studentId).subscribe({
      next: (response) => {
        if (setAsSelected || this.selectedStudentId === studentId) {
          this.selectedStudentGpa = response;
        }
        this.recentGpaUpdate = response;
      },
      error: () => {
        this.errorMessage = 'Unable to load GPA.';
      }
    });
  }
}
