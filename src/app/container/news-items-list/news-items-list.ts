import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsItem } from '../../shared/models/news-item.model';
import { NewsItemCard } from '../news-items-list/news-item-card/news-item-card';
import { DataService } from '../../shared/services/data';

@Component({
  selector: 'app-news-items-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NewsItemCard],
  templateUrl: './news-items-list.html',
  styleUrls: ['./news-items-list.css'],
})

export class NewsItemsList implements OnInit {
  newsItems: NewsItem[] = [];
  constructor(private dataService: DataService) {} // Сервіс інжектовано в конструктор

  ngOnInit(): void {
    this.newsItems = this.dataService.getItems(); // Для отримання даних із сервісу
  }

  searchText: string = ''; // Виконання двосторонньої прив'язки

  filteredItems(): NewsItem[] {
    if (!this.searchText.trim()) return this.newsItems;

    const text = this.searchText.toLowerCase();
    return this.newsItems.filter(item =>
      item.title.toLowerCase().includes(text) ||
      item.author.toLowerCase().includes(text) ||
      item.genre.toLowerCase().includes(text) ||
      item.language.toLowerCase().includes(text) ||
      item.keywords.some(k => k.toLowerCase().includes(text))
    );
  } // Виконання пошуку

  onItemSelected(selected: NewsItem) {
    console.log('Selected item:', selected);
  } // При виборі елемента
}
