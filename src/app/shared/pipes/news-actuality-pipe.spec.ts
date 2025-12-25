import { NewsActualityPipe } from './news-actuality-pipe';

describe('NewsActualityPipe', () => {
  let pipe: NewsActualityPipe;

  beforeEach(() => {
    pipe = new NewsActualityPipe();
  });
  it('should create pipe', () => {
    expect(pipe).toBeTruthy();
  });
  it('should return "Current News" for date within 30 days', () => {
    const recentDate = new Date();
    recentDate.setDate(recentDate.getDate() - 5); // 5 днів тому

    const result = pipe.transform(recentDate);

    expect(result.label).toBe('Current News');
    expect(result.status).toBe('actual');
  });

  it('should return "Not Current" for date older than 30 days', () => {
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 60); // 60 днів тому

    const result = pipe.transform(oldDate);

    expect(result.label).toBe('Not Current');
    expect(result.status).toBe('not-actual');
  });
});
