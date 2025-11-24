import {Component, OnInit, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsItem } from '../../shared/models/news-item.model';
import { NewsItemCard } from '../news-items-list/news-item-card/news-item-card';
import { DataService } from '../../shared/services/data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news-items-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NewsItemCard],
  templateUrl: './news-items-list.html',
  styleUrls: ['./news-items-list.css'],
})

export class NewsItemsList implements OnInit, OnDestroy {
  newsItems: NewsItem[] = [];
  constructor(private dataService: DataService) {} // Сервіс інжектовано в конструктор

  private itemsSub!: Subscription; // Створення підписки

  ngOnInit(): void {
    this.itemsSub = this.dataService.getItems().subscribe(items => {
      this.newsItems = items; // Виконуємо підписку на Observable
    });
  }

  searchText: string = ''; // Виконання двосторонньої прив'язки

  onSearchChange() {
    this.dataService.searchItems(this.searchText);
  } // Фільтрація при виконанні пошуку

  onItemSelected(selected: NewsItem) {
    console.log('Selected item:', selected);
  } // При виборі елемента

  ngOnDestroy(): void {
    if (this.itemsSub) {
      this.itemsSub.unsubscribe(); // Виконання відписки
    }
  }
}


