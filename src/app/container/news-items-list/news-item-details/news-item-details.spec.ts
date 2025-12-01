import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsItemDetails } from './news-item-details';

describe('NewsItemDetails', () => {
  let component: NewsItemDetails;
  let fixture: ComponentFixture<NewsItemDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsItemDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsItemDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
