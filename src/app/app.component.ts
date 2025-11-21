import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NewsItem} from "./shared/models/news-item.model";
import { CommonModule } from '@angular/common';
import { NewsItemCard } from '../app/container/news-items-list/news-item-card/news-item-card';
import {FormsModule} from "@angular/forms";
import {DataService} from "./shared/services/data";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NewsItemCard, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'it-news-angular-app';
  appTitle = 'News from IT industry';
  newsItems: NewsItem[] = [];
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.newsItems = this.dataService.getItems();
  }
  searchText: string = '';

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
