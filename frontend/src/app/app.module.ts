import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Fixes ngModel, formGroup

// HttpClient is needed for all service calls (like CourseService)
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';

// --- Components ---
// Core
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentDashboardComponent } from './components/student/student-dashboard.component';

// Student
import { StudentListComponent } from './components/student/student-list.component';
import { StudentFormComponent } from './components/student/student-form.component';

// Course
import { CourseListComponent } from './components/course/course-list.component';
import { CourseFormComponent } from './components/course/course-form.component'; // Assuming you have a form component

// Faculty
import { FacultyListComponent } from './components/faculty/faculty-list.component';
import { FacultyFormComponent } from './components/faculty/faculty-form.component';

// Enrollment
import { EnrollmentComponent } from './components/enrollment/enrollment.component';


@NgModule({
    
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    StudentDashboardComponent,
    StudentListComponent,
    StudentFormComponent,
    CourseListComponent,
    CourseFormComponent,
    FacultyListComponent,
    FacultyFormComponent,
    EnrollmentComponent,
  ],
  
  imports: [
    BrowserModule,        // Includes CommonModule - provides *ngIf, *ngFor, etc.
    FormsModule,          // Required for [(ngModel)] (used in LoginComponent, EnrollmentComponent)
    ReactiveFormsModule,  // Required for [formGroup] (used in StudentForm, CourseForm, FacultyForm)
    HttpClientModule,     // Required for all API calls (used by all services)
    AppRoutingModule      // Required for [routerLink] and routing functionality
  ],
  
  providers: [
    // HTTP Interceptor for adding auth tokens to requests
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    // Services are provided via `providedIn: 'root'` in their respective service files
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
