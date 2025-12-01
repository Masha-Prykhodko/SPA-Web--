import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../../shared/services/data';
import { NewsItem } from '../../../shared/models/news-item.model';

@Component({
  selector: 'app-news-item-details',
  imports: [CommonModule],
  templateUrl: './news-item-details.html',
  styleUrl: './news-item-details.css',
})
export class NewsItemDetails implements OnInit {
  item?: NewsItem;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const idParam = params.get('id');
      const id = idParam ? Number(idParam) : null;

      if (id !== null) {
        this.item = this.dataService.getItemById(id);
      }
    });
  }
}
