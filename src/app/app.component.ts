import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NewsItem} from "./shared/models/news-item.model";
import { CommonModule } from '@angular/common';
import { NewsItemCard } from '../app/container/news-items-list/news-item-card/news-item-card';
import {FormsModule} from "@angular/forms";

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
  searchText: string = '';
    newsItems: NewsItem[] = [
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
      new Date('2025-10-31'),
      'Conferences',
      3.5,
      'English',
      'https://www.shutterstock.com/image-photo/cyber-security-team-working-operations-260nw-2503714065.jpg',
      4.2,
      ['conference', 'events', 'internationale', '2025'],
      true
    ),
  ];
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
