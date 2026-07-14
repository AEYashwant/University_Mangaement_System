import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacultyService } from '../../services/faculty.service';
import { Faculty } from '../../models/faculty.model';

@Component({
  selector: 'app-faculty-form',
  standalone: false,
  templateUrl: './faculty-form.component.html',
  styleUrls: ['./faculty-form.component.css']
})
export class FacultyFormComponent implements OnInit {
  facultyForm!: FormGroup;
  isEditMode: boolean = false;
  facultyId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private facultyService: FacultyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.facultyId = +idParam;
      this.isEditMode = true;
      this.loadFaculty(this.facultyId);
    }
  }

  initForm(): void {
    this.facultyForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      designation: ['', Validators.required]
    });
  }

  loadFaculty(id: number): void {
    this.facultyService.getFacultyMember(id).subscribe(faculty => {
      this.facultyForm.patchValue(faculty);
    });
  }

  onSubmit(): void {
    if (this.facultyForm.invalid) {
      return;
    }

    const facultyData: Faculty = this.facultyForm.value;

    if (this.isEditMode && this.facultyId) {
      this.facultyService.updateFacultyMember(this.facultyId, facultyData).subscribe(() => {
        this.router.navigate(['/faculty']);
      });
    } else {
      this.facultyService.createFacultyMember(facultyData).subscribe(() => {
        this.router.navigate(['/faculty']);
      });
    }
  }
}