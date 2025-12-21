import { Injectable } from '@angular/core';
import { NewsItem } from '../../shared/models/news-item.model';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { NewsItemForm} from "../../container/news-item-form/news-item-form";
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})

export class DataService {
  private apiUrl = 'http://localhost:3000/items'; // Змінено URL

  private itemsSubject = new BehaviorSubject<NewsItem[]>([]);
  items$ = this.itemsSubject.asObservable(); // Для використання підписки у компонентах

  constructor(private http: HttpClient, private toastr: ToastrService) {} // інжектуємо HttpClient

  getItems(): Observable<NewsItem[]> {
    return this.http.get<NewsItem[]>(this.apiUrl).pipe(
      tap(items => this.itemsSubject.next(items)),
      catchError(error => {
      this.toastr.error(
        'Failed to load news items',
        'Server error'
      );
      return throwError(() => error); // Виконання обробки помилок
    })
    );
  } //Використовує Observable для передачі даних

  searchItems(query: string): void {
    const text = query.toLowerCase().trim();
    if (!text) {
      this.getItems().subscribe();
      return;
    }
    const filtered = this.itemsSubject.value.filter(item =>
      item.title.toLowerCase().includes(text) ||
      item.author.toLowerCase().includes(text) ||
      item.genre.toLowerCase().includes(text) ||
      item.language.toLowerCase().includes(text) ||
      item.keywords.some(k => k.toLowerCase().includes(text))
    );
    this.itemsSubject.next(filtered);
  }// Метод для виконання пошуку, перенесений у сервіс

  getItemById(id: number): Observable<NewsItem> {
    return this.http.get<NewsItem>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        this.toastr.error('Item not found', 'Error');
        return throwError(() => error); // Обробка помилок при виводі картки за її ID
      })
    );
  }// Метод для пошуку обраної карти, задля відображення деталей

  // Методи для майбутнього використання
  addItem(item: NewsItem): Observable<NewsItem> {
      return this.http.post<NewsItem>(this.apiUrl, item).pipe(
        tap(newItem => {
          const current = this.itemsSubject.value;
          this.itemsSubject.next([...current, newItem]);
          this.toastr.success('Item added successfully');
        }),
        catchError(error => {
          this.toastr.error('Failed to add item',
            'Server error');
          return throwError(() => error);// Обробка помилки при додаванні
        })
      );
  }// Забезпечить додавання елементів

  updateItems(newList: NewsItem[]): void {
    this.itemsSubject.next(newList);
  } // Метод для оновлення списку

  removeItem(id: number): void {
    const updated = this.itemsSubject.value.filter(x => x.id !== id);
    this.itemsSubject.next(updated);
  } // Створено для видалення елементів
}

















