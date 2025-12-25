import { of } from 'rxjs';
import { NewsItem } from '../models/news-item.model';

export const mockItems: NewsItem[] = [
  new NewsItem(
    1,
    'Test title',
    'Test author',
    new Date(),
    'Test genre',
    10,
    'English',
    'img.jpg',
    4.5,
    ['test'],
    true
  )
];

export class MockData {
  items$ = of(mockItems);

  getItems() {
    return of(mockItems);
  }
  getItemById(id: number) {
    return of(mockItems.find(item => item.id === id)!);
  }
  searchItems() {}
}
