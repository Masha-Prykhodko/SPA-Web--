import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NewsItemCard } from './news-item-card';
import { NewsItem } from '../../../shared/models/news-item.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('NewsItemCard', () => {
  let component: NewsItemCard;
  let fixture: ComponentFixture<NewsItemCard>;

  const mockItem: NewsItem = {
    id: 1,
    title: 'Test News Title',
    author: 'John Doe',
    publicationDate: new Date(),
    genre: 'Technology',
    language: 'English',
    pageCount: 120,
    rating: 4.5,
    keywords: ['Angular', 'Testing'],
    postImage: 'test-image.jpg',
    isActual: true
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsItemCard,RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NewsItemCard);
    component = fixture.componentInstance;
    component.item = mockItem; // передаємо Input
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should display news title', () => {
    const titleEl = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(titleEl.textContent).toContain(mockItem.title);
  });

  it('should display author', () => {
    const authorEl = fixture.debugElement.query(By.css('p strong')).nativeElement;
    expect(fixture.nativeElement.textContent).toContain(mockItem.author);
  });

  it('should display image with correct src', () => {
    const imgEl: HTMLImageElement =
      fixture.debugElement.query(By.css('img')).nativeElement;

    expect(imgEl.src).toContain(mockItem.postImage);
    expect(imgEl.alt).toBe(mockItem.title);
  });

  it('should display keywords', () => {
    const content = fixture.nativeElement.textContent;
    expect(content).toContain('Angular, Testing');
  });

  it('should show "Recent News" label for recent publication date', () => {
    const recentLabel = fixture.debugElement.query(By.css('.recent-label'));
    expect(recentLabel).toBeTruthy();
  });

  it('should emit select event when onSelectItem is called', () => {
    spyOn(component.select, 'emit');

    component.onSelectItem();

    expect(component.select.emit).toHaveBeenCalledWith(mockItem);
  });
});
