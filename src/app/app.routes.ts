import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'dashboard', component: EmployeeComponent, canActivate: [authGuard] },
];
