import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsItemsList } from './news-items-list';

describe('NewsItemsList', () => {
  let component: NewsItemsList;
  let fixture: ComponentFixture<NewsItemsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsItemsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsItemsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
