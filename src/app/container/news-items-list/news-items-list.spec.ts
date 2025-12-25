import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NewsItemsList } from './news-items-list';
import { NewsItemCard } from './news-item-card/news-item-card';
import { DataService } from '../../shared/services/data';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NewsItem } from '../../shared/models/news-item.model';

const mockItems: NewsItem[] = [
  {
    id: 1,
    title: 'News 1',
    author: 'Author 1',
    publicationDate: new Date(),
    genre: 'Tech',
    language: 'EN',
    pageCount: 10,
    rating: 5,
    keywords: ['Test'],
    postImage: 'test-image.jpg',
    isActual: true
  },
  {
    id: 2,
    title: 'News 2',
    author: 'Author 2',
    publicationDate: new Date(),
    genre: 'Science',
    language: 'EN',
    pageCount: 15,
    rating: 4,
    keywords: ['Test'],
    postImage: 'test-image2.jpg',
    isActual: false
  }
];

@Injectable()
class MockDataService {
  private itemsSubject = new BehaviorSubject<NewsItem[]>(mockItems);
  items$ = this.itemsSubject.asObservable();
  getItems() {
    this.itemsSubject.next(mockItems);
  }
  searchItems(text: string) {
    const filtered = mockItems.filter(item => item.title.includes(text));
    this.itemsSubject.next(filtered);
  }
}

describe('NewsItemsList ↔ NewsItemCard integration', () => {
  let fixture: ComponentFixture<NewsItemsList>;
  let component: NewsItemsList;
  let dataService: MockDataService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, NewsItemsList, NewsItemCard],
      providers: [{ provide: DataService, useClass: MockDataService }]
    }).compileComponents();

    fixture = TestBed.createComponent(NewsItemsList);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService) as unknown as MockDataService;
  });

  it('should render NewsItemCard components for each news item', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const cards = fixture.debugElement.queryAll(By.directive(NewsItemCard));
    expect(cards.length).toBe(mockItems.length);
    const firstCard = cards[0].componentInstance as NewsItemCard;
    expect(firstCard.item.title).toBe('News 1');
  }));
});

 // describe('NewsItemsList', () => {
  //let component: NewsItemsList;
 // let fixture: ComponentFixture<NewsItemsList>;

 // beforeEach(async () => {
   // await TestBed.configureTestingModule({
    //  imports: [NewsItemsList]
   // })
   // .compileComponents();

   // fixture = TestBed.createComponent(NewsItemsList);
  //  component = fixture.componentInstance;
  //  fixture.detectChanges();
 // });

 // it('should create', () => {
 //   expect(component).toBeTruthy();
//  });
// });
