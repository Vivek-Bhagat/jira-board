import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { BoardComponent } from './components/board/board';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'board',
    component: BoardComponent,
    canActivate: [authGuard],
  },

  {
    path: '',
    redirectTo: '/board',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/board',
  },
];
