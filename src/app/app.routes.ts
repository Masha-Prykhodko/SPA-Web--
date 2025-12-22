import { Routes } from '@angular/router';
import { NewsItemsList } from '../app/container/news-items-list/news-items-list';
import { NewsItemDetails } from '../app/container/news-items-list/news-item-details/news-item-details';
import {NewsItemForm} from "./container/news-item-form/news-item-form";
import {Login} from "./container/login/login";
import {Register} from "./container/register/register";
import { AuthGuard } from '../app/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'items',
    component: NewsItemsList
  },
  {
    path: 'items/:id',
    component: NewsItemDetails
  },
  {
    path: 'add-item',
    component: NewsItemForm, // Додано новий маршрут до форми
    canActivate: [AuthGuard]  // Додано захисника маршруту
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  }, // Додано маршрути для реєстрації та авторизації
  { path: '', redirectTo: 'items', pathMatch: 'full' }
];
