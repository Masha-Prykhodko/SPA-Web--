import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NewsItem } from '../../../shared/models/news-item.model';
import { NewsActualityPipe } from '../../../shared/pipes/news-actuality-pipe';
import { RouterLink } from '@angular/router';
import {HoverStyle} from "../../../hover-style";

@Component({
  selector: 'app-news-item-card',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink, NewsActualityPipe, HoverStyle],
  templateUrl: './news-item-card.html',
  styleUrls: ['./news-item-card.css']
})
export class NewsItemCard {
  @Input() item!: NewsItem; // Офіційно оголошено  input для news-item-card

  @Output() select = new EventEmitter<NewsItem>(); // Додано Output та EventEmitter

  onSelectItem(): void {
    this.select.emit(this.item);
  }

  isRecentNews(date: Date): boolean {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - new Date(date).getTime());
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 30;
  }
}
