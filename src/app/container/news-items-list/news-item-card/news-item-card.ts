import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NewsItem } from '../../../shared/models/news-item.model';

@Component({
  selector: 'app-news-item-card',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './news-item-card.html',
  styleUrls: ['./news-item-card.css']
})
export class NewsItemCard {
  @Input() item!: NewsItem;
  isRecentNews(date: Date): boolean {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - new Date(date).getTime());
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 30;
  }
}
