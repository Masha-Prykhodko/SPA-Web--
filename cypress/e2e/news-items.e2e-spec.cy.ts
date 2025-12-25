import { defineConfig } from 'cypress';

describe('News Items E2E', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200'); // Відкриваємо головну сторінку Angular додатку

    cy.intercept('GET', '/items', {
      statusCode: 200,
      body: [
        {
          id: 1,
          title: 'Employment in IT',
          author: 'D.I. Reedl',
          publicationDate: '2025-11-10',
          genre: 'Employment',
          language: 'English',
          pageCount: 5,
          rating: 3.9,
          keywords: ['employment', 'IT', 'news','2025'],
          postImage: 'https://st3.depositphotos.com/2033625/18230/i/450/depositphotos_182302072-stock-photo-it-expert-on-keyboard-button.jpg',
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
  }); // Інтерсепт API для завантаження карток

  it('should load news cards, perform search, and view details', () => {
    cy.wait('@getItems');

    cy.get('app-news-item-card').should('have.length', 2); // Перевіряємо, що картки з новинами завантажені

    cy.get('input[type="text"]').type('Employment in IT'); // Виконуємо пошук по заголовку "News 1"
    cy.get('button.search-button').click();

    cy.get('app-news-item-card').should('have.length', 1);
    cy.get('app-news-item-card').first().contains('Employment in IT'); // Після пошуку повинна залишитись тільки одна картка

    cy.get('app-news-item-card').first().within(() => {
      cy.get('button.details-btn').click();
    }); // Клікаємо на кнопку всередині картки для переходу до деталей

    cy.url().should('include', '/items/1'); // Перевіряємо, що URL змінився на details сторінку

    cy.get('app-news-item-details').within(() => {
      cy.contains('Employment in IT');
      cy.contains('D.I. Reedl');
      cy.contains('Employment');
      cy.contains('English');
    });
  }); // Перевіряємо контент деталей картки
});
