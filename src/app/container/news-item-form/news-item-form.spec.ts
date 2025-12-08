import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsItemForm } from './news-item-form';

describe('NewsItemForm', () => {
  let component: NewsItemForm;
  let fixture: ComponentFixture<NewsItemForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsItemForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsItemForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
