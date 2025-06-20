import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username = '';
  password = '';
  error = '';
  success = '';
  loading = false;

  constructor(private router: Router, private http: HttpClient) {}

  onLogin() {
    this.error = '';
    this.success = '';
    this.loading = true;
    this.http.post<any>('http://localhost:5000/api/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res) => {
        this.success = res.message;
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = err.error?.error || 'Login failed';
        this.loading = false;
      }
    });
  }
}
