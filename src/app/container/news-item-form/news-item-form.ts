import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService} from "../../shared/services/data";
import { Router } from '@angular/router';
import { NewsItem } from '../../shared/models/news-item.model';

@Component({
  selector: 'app-news-item-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './news-item-form.html',
  styleUrl: './news-item-form.css',
})
export class NewsItemForm {
  itemForm: FormGroup;

  constructor(private dataService: DataService, private router: Router) {
    this.itemForm = new FormGroup({
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      publicationDate: new FormControl('', Validators.required),
      genre: new FormControl('', Validators.required),
      language: new FormControl('', Validators.required),
      pageCount: new FormControl('', [Validators.required, Validators.min(1)]),
      rating: new FormControl('', [Validators.required, Validators.min(0), Validators.max(5)]),
      postImage: new FormControl('', [Validators.required, Validators.pattern(/^(https?:\/\/)[\w\-~.]+/i)]),
      keywords: new FormControl('', [Validators.required]),
      isActual: new FormControl(false)
    }); // Створено FormGroup з FormControl до усіх полів
  }// І додано валідатори

  onSubmit() {
    if (this.itemForm.valid) {
      const formValue = this.itemForm.value;
      const newItem = new NewsItem(
        Date.now(),
        formValue.title,
        formValue.author,
        new Date(formValue.publicationDate),
        formValue.genre,
        formValue.pageCount,
        formValue.language,
        formValue.postImage,
        formValue.rating,
        formValue.keywords.split(',').map((k: string) => k.trim()),
        formValue.isActual
      ); // Якщо форма валідна створюємо новий елемент NewsItem

      this.dataService.addItem(newItem).subscribe({  // Викликаємо сервіс для додавання елемента
        next: () => {
          console.log('✔ Item added successfully');
          this.router.navigate(['/items']); // Перехід на список після додавання
        },
        error: (err) => {
          console.error('❌ Error adding item', err);
        }
      });
    } else {
      console.log('❌ Form is invalid');
      this.itemForm.markAllAsTouched();
    }
  }
}





