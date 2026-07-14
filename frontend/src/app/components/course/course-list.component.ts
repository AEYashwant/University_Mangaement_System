import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service'; // Use '../../'
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-list',
  standalone: false,
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe((data: Course[]) => {

      this.courses = data;
    });
  }

  deleteCourse(id: number | undefined): void {
    if (id && confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(id).subscribe(() => {
        this.loadCourses();
      });
    }
  }
}