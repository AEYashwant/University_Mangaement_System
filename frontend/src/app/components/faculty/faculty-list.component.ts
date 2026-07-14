import { Component, OnInit } from '@angular/core';
import { FacultyService } from '../../services/faculty.service';
import { Faculty } from '../../models/faculty.model';

@Component({
  selector: 'app-faculty-list',
  standalone: false,
  templateUrl: './faculty-list.component.html',
  styleUrls: ['./faculty-list.component.css']
})
export class FacultyListComponent implements OnInit {
  faculty: Faculty[] = [];

  constructor(private facultyService: FacultyService) { }

  ngOnInit(): void {
    this.loadFaculty();
  }

  loadFaculty(): void {
    this.facultyService.getFaculty().subscribe(data => {
      this.faculty = data;
    });
  }

  deleteFaculty(id: number | undefined): void {
    if (id && confirm('Are you sure you want to delete this faculty member?')) {
      this.facultyService.deleteFacultyMember(id).subscribe(() => {
        this.loadFaculty();
      });
    }
  }
}