import { Component } from '@angular/core';
import {NewsItem} from "../shared/models/news-item.model";
import { CommonModule } from '@angular/common';
import { NewsItemCard } from '../container/news-items-list/news-item-card/news-item-card';
import {FormsModule} from "@angular/forms";
import {DataService} from "../shared/services/data";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-container',
  imports: [CommonModule, NewsItemCard, FormsModule],
  templateUrl: './container.html',
  styleUrl: './container.css',
})

export class Container {
  newsItems: NewsItem[] = [];
  searchText: string = ''; // Виконання двосторонньої прив'язки

  onItemSelected(selected: NewsItem) {
    console.log('Selected item:', selected);
  }
}
