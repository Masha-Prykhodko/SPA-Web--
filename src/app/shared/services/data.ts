import { Injectable } from '@angular/core';
import { NewsItem } from '../../shared/models/news-item.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { NewsItemForm} from "../../container/news-item-form/news-item-form";

@Injectable({
  providedIn: 'root',
})

export class DataService {
  private originalItems: NewsItem[] = [
    new NewsItem(
      1,
      'Employment in IT',
      'D.I. Reedl',
      new Date('2025-11-10'),
      'Employment',
      5,
      'English',
      'https://st3.depositphotos.com/2033625/18230/i/450/depositphotos_182302072-stock-photo-it-expert-on-keyboard-button.jpg',
      3.9,
      ['employment', 'IT', 'news', '2025'],
      true
    ),
    new NewsItem(
      2,
      'Future Technologies of AI',
      'M.V. Kovalchuk',
      new Date('2024-11-09'),
      'Technology of AI',
      8,
      'English',
      'https://dialab.dp.ua/wp-content/uploads/2025/08/0-9.jpg',
      4.8,
      ['technology', 'innovation', 'AI', '2024'],
      false
    ),
    new NewsItem(
      3,
      'Internationale conference of Computer science',
      'O.M. Trevor',
      new Date('2025-12-01'),
      'Conferences',
      3.5,
      'English',
      'https://www.shutterstock.com/image-photo/cyber-security-team-working-operations-260nw-2503714065.jpg',
      4.2,
      ['conference', 'events', 'internationale', '2025'],
      true
    )
  ];
  private itemsSubject = new BehaviorSubject<NewsItem[]>(this.originalItems);

  items$ = this.itemsSubject.asObservable(); // Для використання підписки у компонентах
  constructor() {}

  getItems(): Observable<NewsItem[]> {
    return this.items$; //Використовує Observable для передачі даних
  }

  searchItems(query: string): void {
    const text = query.toLowerCase().trim();
    if (!text) {
      this.itemsSubject.next(this.originalItems);
      return; // Якщо поле пошуку пусте, видно весь масив даних
    }

    const filtered = this.originalItems.filter(item =>
      item.title.toLowerCase().includes(text) ||
      item.author.toLowerCase().includes(text) ||
      item.genre.toLowerCase().includes(text) ||
      item.language.toLowerCase().includes(text) ||
      item.keywords.some(k => k.toLowerCase().includes(text))
    );
    this.itemsSubject.next(filtered);
  } // Метод для виконання пошуку, перенесений у сервіс

  getItemById(id: number): NewsItem | undefined {
    return this.itemsSubject.value.find(item => item.id === id);
  } // Метод для пошуку обраної карти, задля відображення деталей

  // Методи для майбутнього використання
  addItem(item: NewsItem): void {
    const current = this.itemsSubject.value;
    this.itemsSubject.next([...current, item]);
  } // Забезпечить додавання елементів

  updateItems(newList: NewsItem[]): void {
    this.itemsSubject.next(newList);
  } // Метод для оновлення списку

  removeItem(id: number): void {
    const updated = this.itemsSubject.value.filter(x => x.id !== id);
    this.itemsSubject.next(updated);
  } // Створено для видалення елементів
}
