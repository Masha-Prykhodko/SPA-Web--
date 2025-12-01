import { Routes } from '@angular/router';
import { NewsItemsList } from '../app/container/news-items-list/news-items-list';
import { NewsItemDetails } from '../app/container/news-items-list/news-item-details/news-item-details';

export const routes: Routes = [
  {
    path: 'items',
    component: NewsItemsList
  },
  {
    path: 'items/:id',
    component: NewsItemDetails
  },
  { path: '', redirectTo: 'items', pathMatch: 'full' }
];
