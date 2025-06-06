import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Employee {
  id?: number;
  name: string;
  email: string;
  designation: string
}

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './employee.html',
  styleUrls: ['./employee.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  employeeModel: Employee = { id: undefined, name: '', email: '', designation: '' };
  editingId: number | null = null;
  API_URL = 'http://localhost:5000/employees';
  submitting = false;
  deletingId: number | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.http.get<Employee[]>(this.API_URL).subscribe(data => {
      this.employees = data;
    });
  }

  onSubmit() {
    // Prevent add/update if any field is empty
    if (!this.employeeModel.name.trim() || !this.employeeModel.email.trim() || !this.employeeModel.designation.trim()) {
      alert('Please fill in all fields before submitting.');
      return;
    }
    // Prevent double submission
    if (this.submitting) return;
    this.submitting = true;

    if (this.editingId) {
      // Update
      const payload = {
        name: this.employeeModel.name,
        email: this.employeeModel.email,
        designation: this.employeeModel.designation
      };
      this.http.put(`${this.API_URL}/${this.editingId}`, payload).subscribe({
        next: () => {
          this.resetForm();
          window.location.reload();
          this.submitting = false;
        },
        error: () => { this.submitting = false; }
      });
    } else {
      // Add
      const payload = {
        name: this.employeeModel.name,
        email: this.employeeModel.email,
        designation: this.employeeModel.designation
      };
      this.http.post(this.API_URL, payload).subscribe({
        next: () => {
          this.resetForm();
          window.location.reload();
          this.submitting = false;
        },
        error: () => { this.submitting = false; }
      });
    }
  }

  editEmployee(emp: Employee) {
    this.editingId = emp.id!;
    this.employeeModel = { ...emp };
    // Remove focus from the button to prevent accidental double click
    setTimeout(() => {
      const btn = document.activeElement as HTMLElement;
      if (btn) btn.blur();
    }, 0);
  }

  deleteEmployee(id: number | undefined) {
    if (id && confirm('Are you sure you want to delete this employee?')) {
      // Prevent double deletion
      if (this.deletingId === id) return;
      this.deletingId = id;
      this.http.delete(`${this.API_URL}/${id}`).subscribe({
        next: () => {
          window.location.reload();
          this.deletingId = undefined;
        },
        error: () => { this.deletingId = undefined; }
      });
    }
  }

  resetForm() {
    this.editingId = null;
    this.employeeModel = { id: undefined, name: '', email: '', designation: '' };
    this.submitting = false;
  }
}
