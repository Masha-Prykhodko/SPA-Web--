import { Component } from '@angular/core';
import {NewsItem} from "../shared/models/news-item.model";
import { CommonModule } from '@angular/common';
import { NewsItemCard } from '../container/news-items-list/news-item-card/news-item-card';
import {FormsModule} from "@angular/forms";
import {DataService} from "../shared/services/data";

@Component({
  selector: 'app-container',
  imports: [CommonModule, NewsItemCard, FormsModule],
  templateUrl: './container.html',
  styleUrl: './container.css',
})

export class Container {
  newsItems: NewsItem[] = [];
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Отримуємо дані із сервісу
    this.newsItems = this.dataService.getItems();
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
  }

  onItemSelected(selected: NewsItem) {
    console.log('Selected item:', selected);
  }
}
