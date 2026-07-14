import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import all your components
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentListComponent } from './components/student/student-list.component';
import { StudentFormComponent } from './components/student/student-form.component';
import { StudentDashboardComponent } from './components/student/student-dashboard.component';
import { CourseListComponent } from './components/course/course-list.component';
import { CourseFormComponent } from './components/course/course-form.component';
import { FacultyListComponent } from './components/faculty/faculty-list.component';
import { FacultyFormComponent } from './components/faculty/faculty-form.component';
import { EnrollmentComponent } from './components/enrollment/enrollment.component';
import { AuthGuard } from './guards/auth.guard'; // Use your AuthGuard

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'students', component: StudentListComponent, canActivate: [AuthGuard] },
  { path: 'students/add', component: StudentFormComponent, canActivate: [AuthGuard] },
  { path: 'students/edit/:id', component: StudentFormComponent, canActivate: [AuthGuard] },
  { path: 'students/:id/dashboard', component: StudentDashboardComponent, canActivate: [AuthGuard] },
  { path: 'courses', component: CourseListComponent, canActivate: [AuthGuard] },
  { path: 'courses/add', component: CourseFormComponent, canActivate: [AuthGuard] },
  { path: 'courses/edit/:id', component: CourseFormComponent, canActivate: [AuthGuard] },
  { path: 'faculty', component: FacultyListComponent, canActivate: [AuthGuard] },
  { path: 'faculty/add', component: FacultyFormComponent, canActivate: [AuthGuard] },
  { path: 'faculty/edit/:id', component: FacultyFormComponent, canActivate: [AuthGuard] },
  { path: 'enrollment', component: EnrollmentComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' } // Wildcard route for a 404-like redirect
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
