import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsItem } from '../../shared/models/news-item.model';
import { NewsItemCard } from '../news-items-list/news-item-card/news-item-card';

@Component({
  selector: 'app-news-items-list',
  standalone: true,
  imports: [CommonModule, NewsItemCard],
  templateUrl: './news-items-list.html',
  styleUrls: ['./news-items-list.css'],
})
export class NewsItemsList {
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

  isRecentNews(date: Date): boolean {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - new Date(date).getTime());
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 30;
  }
}
