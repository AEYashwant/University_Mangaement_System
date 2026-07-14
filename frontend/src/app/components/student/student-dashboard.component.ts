import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { StudentDashboard } from '../../models/student-dashboard.model';

@Component({
  selector: 'app-student-dashboard',
  standalone: false,
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  dashboard: StudentDashboard | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) {
        this.dashboard = null;
        this.errorMessage = 'Student not found.';
        this.isLoading = false;
        return;
      }

      this.loadDashboard(Number(id));
    });
  }

  loadDashboard(studentId: number): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.dashboard = null;

    this.studentService.getStudentDashboard(studentId).subscribe({
      next: (dashboard) => {
        this.dashboard = dashboard;
        this.isLoading = false;
      },
      error: () => {
        this.dashboard = null;
        this.errorMessage = 'Unable to load the student dashboard.';
        this.isLoading = false;
      }
    });
  }
}
