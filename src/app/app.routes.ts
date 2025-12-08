import { Routes } from '@angular/router';
import { NewsItemsList } from '../app/container/news-items-list/news-items-list';
import { NewsItemDetails } from '../app/container/news-items-list/news-item-details/news-item-details';
import {NewsItemForm} from "./container/news-item-form/news-item-form";

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
    component: NewsItemForm   // Додано новий маршрут до форми
  },
  { path: '', redirectTo: 'items', pathMatch: 'full' }
];
