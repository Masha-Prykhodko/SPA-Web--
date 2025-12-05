import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsItem } from '../../shared/models/news-item.model';
import { NewsItemCard } from '../news-items-list/news-item-card/news-item-card';
import { DataService } from '../../shared/services/data';
import {Observable} from "rxjs";

@Component({
  selector: 'app-news-items-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NewsItemCard],
  templateUrl: './news-items-list.html',
  styleUrls: ['./news-items-list.css'],
})

export class NewsItemsList {

  searchText: string = '';
  items$!: Observable<NewsItem[]>;

  constructor(private dataService: DataService) {
    this.items$ = this.dataService.items$;
  }

  onSearchChange() {
    this.dataService.searchItems(this.searchText);
  }// Метод який спрацьовує при пошуку

  onItemSelected(selected: NewsItem) {
    console.log('Selected item:', selected);
  } // При виборі елемента
}


