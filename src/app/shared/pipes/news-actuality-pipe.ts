import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newsActuality'
})
export class NewsActualityPipe implements PipeTransform {

  transform(publicationDate: Date): { label: string; status: 'actual' | 'not-actual' } {
    const now = new Date();
    const diff = Math.abs(now.getTime() - new Date(publicationDate).getTime());
    const days = diff / (1000 * 60 * 60 * 24);

    return days <= 30
      ? { label: 'Current News', status: 'actual' }
      : { label: 'Not Current', status: 'not-actual' };
  }
}
