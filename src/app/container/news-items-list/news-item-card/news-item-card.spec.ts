import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsItemCard } from './news-item-card';

describe('NewsItemCard', () => {
  let component: NewsItemCard;
  let fixture: ComponentFixture<NewsItemCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsItemCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsItemCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
