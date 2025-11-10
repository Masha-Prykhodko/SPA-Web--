export class NewsItem {
  constructor(
    public id: number,
    public title: string,
    public author: string,
    public publicationDate: Date,
    public genre: string,
    public pageCount: number,
    public language: string,
    public postImage: string,
    public rating: number,
    public keywords: string[],
    public isActual: boolean,
    public discountActuality?: number
  ) { }
}
