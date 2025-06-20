import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {
  username = '';
  password = '';
  confirmPassword = '';
  error = '';
  success = '';
  loading = false;


  constructor(private router: Router, private http: HttpClient) {}

  onSignup() {
    this.error = '';
    this.success = '';
    if (!this.username || !this.password || !this.confirmPassword) {
      this.error = 'All fields are required.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }
    this.loading = true;
    this.http.post<any>('http://localhost:5000/api/signup', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res) => {
        this.success = res.message + ' Redirecting to login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        this.error = err.error?.error || 'Signup failed';
        this.loading = false;
      }
    });
  }
}
