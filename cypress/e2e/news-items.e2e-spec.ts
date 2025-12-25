import { defineConfig } from 'cypress';

describe('News Items E2E', () => {
  beforeEach(() => {
    cy.visit('/');// Відкриваємо головну сторінку

    cy.intercept('GET', 'http://localhost:3000/items', {
      statusCode: 200,
      body: [
        {
          id: 1,
          title: 'News 1',
          author: 'Author 1',
          publicationDate: '2025-12-25',
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
          publicationDate: '2025-12-24',
          genre: 'Science',
          language: 'EN',
          pageCount: 15,
          rating: 4,
          keywords: ['Test'],
          postImage: 'test-image2.jpg',
          isActual: false
        }
      ]
    }).as('getItems');
  });

  it('should load news cards, perform search, and view details', () => {
    cy.wait('@getItems');
    cy.get('app-news-item-card').should('have.length', 2); // Перевіряємо, що картки з новинами завантажені

    cy.get('input[type="text"]').type('News 1'); // Виконуємо пошук по заголовку "News 1"
    cy.get('button.search-btn').click();

    cy.get('app-news-item-card').should('have.length', 1); // Після пошуку повинна залишитись тільки одна картка
    cy.get('app-news-item-card').first().contains('News 1');

    cy.get('app-news-item-card').first().click();  // Клікаємо на картку для переходу до деталей

    cy.url().should('include', '/items/1'); // Перевіряємо, що URL змінився на details сторінку

    cy.get('app-news-item-details').within(() => {
      cy.contains('News 1');
      cy.contains('Author 1');
      cy.contains('Tech');
      cy.contains('EN'); // Перевіряємо контент деталей картки
    });
  });
});
