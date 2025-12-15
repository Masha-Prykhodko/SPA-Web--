import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../../shared/services/data';
import { NewsItem } from '../../../shared/models/news-item.model';

@Component({
  selector: 'app-news-item-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-item-details.html',
  styleUrls: ['./news-item-details.css'],
})
export class NewsItemDetails implements OnInit {
  item?: NewsItem; // елемент для відображення

  constructor(
    private readonly route: ActivatedRoute,
    private readonly dataService: DataService
  ) {}

  ngOnInit(): void {
    // Отримуємо id з параметрів маршруту
    this.route.paramMap.subscribe((params: ParamMap) => {
      const idParam = params.get('id');
      const id = idParam ? Number(idParam) : null;

      if (id !== null && !isNaN(id)) {
        this.dataService.getItemById(id).subscribe({
          next: (data) => (this.item = data),
          error: (err) => console.error('Error loading item', err),
        });
      }
    });
  }
}
