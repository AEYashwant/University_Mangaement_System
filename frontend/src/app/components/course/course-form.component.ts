import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-form',
  standalone: false,
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  courseForm!: FormGroup;
  isEditMode: boolean = false;
  courseId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.courseId = +idParam;
      this.isEditMode = true;
      this.loadCourse(this.courseId);
    }
  }

  initForm(): void {
    this.courseForm = this.fb.group({
      courseCode: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      credits: [3, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  loadCourse(id: number): void {
    this.courseService.getCourse(id).subscribe(course => {
      this.courseForm.patchValue(course);
    });
  }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      return;
    }

    const courseData: Course = this.courseForm.value;

    if (this.isEditMode && this.courseId) {
      this.courseService.updateCourse(this.courseId, courseData).subscribe(() => {
        this.router.navigate(['/courses']);
      });
    } else {
      this.courseService.createCourse(courseData).subscribe(() => {
        this.router.navigate(['/courses']);
      });
    }
  }
}