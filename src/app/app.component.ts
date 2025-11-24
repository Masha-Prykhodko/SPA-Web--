import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NewsItem} from "./shared/models/news-item.model";
import { CommonModule } from '@angular/common';
import { NewsItemCard } from '../app/container/news-items-list/news-item-card/news-item-card';
import {FormsModule} from "@angular/forms";
import {DataService} from "./shared/services/data";
import { Subscription } from 'rxjs';

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
  searchText: string = '';
  constructor(private dataService: DataService) {}

  private itemsSub!: Subscription;

  ngOnInit(): void {
    this.itemsSub = this.dataService.getItems().subscribe(items => {
      this.newsItems = items;
    });
  }

  onSearchChange() {
    this.dataService.searchItems(this.searchText);
  }

  onItemSelected(selected: NewsItem) {
    console.log('Selected item:', selected);
  }

  ngOnDestroy(): void {
    if (this.itemsSub) {
      this.itemsSub.unsubscribe();
    }
  }
}
