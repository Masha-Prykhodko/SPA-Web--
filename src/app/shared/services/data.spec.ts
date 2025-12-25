import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { NewsItem } from '../models/news-item.model';
import { ToastrService } from 'ngx-toastr';
import { DataService } from './data';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    toastrSpy = jasmine.createSpyObj('ToastrService', ['error', 'success']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService,
        { provide: ToastrService, useValue: toastrSpy }
      ]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Виконуємо перевірку того, чи всі HTTP-запити були виконані
  });

  it('should fetch items and update BehaviorSubject', () => {
    const mockItems: NewsItem[] = [
      {
        id: 1,
        title: 'Test news',
        author: 'Tester',
        publicationDate: new Date(),
        genre: 'IT',
        pageCount: 5,
        language: 'English',
        postImage: 'http://test.com/img.jpg',
        rating: 4,
        keywords: ['test'],
        isActual: true
      }
    ];

    service.getItems().subscribe(items => {
      expect(items.length).toBe(1);
      expect(items[0].title).toBe('Test news');
    });

    const req = httpMock.expectOne('http://localhost:3000/items');
    expect(req.request.method).toBe('GET');
    req.flush(mockItems);
  });

  it('should show toastr error when getItems fails', () => {
    service.getItems().subscribe({
      error: () => {
        expect(toastrSpy.error).toHaveBeenCalledWith(
          'Failed to load news items',
          'Server error'
        );
      }
    });

    const req = httpMock.expectOne('http://localhost:3000/items');
    req.flush('Server error', {
      status: 500,
      statusText: 'Internal Server Error'
    });
  });
});




describe('Data', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


