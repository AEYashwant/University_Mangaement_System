import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  loading = false;
  error = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    // Redirect to dashboard if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loading = true;
    this.error = '';

    this.authService.login(this.username, this.password)
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: err => {
          console.error('Login error:', err);
          if (err.status === 0) {
            this.error = 'Unable to connect to server. Please make sure the backend is running on http://localhost:8080';
          } else if (err.status === 401) {
            this.error = 'Invalid username or password. Please try again.';
          } else if (err.error && typeof err.error === 'string') {
            this.error = err.error;
          } else {
            this.error = 'Login failed. Please check your credentials and try again.';
          }
          this.loading = false;
        }
      });
  }
}