describe('/products page test', function() {
    context('home to products', () => {
        beforeEach(() => {
            cy.visit('/home');
        });
        it('Should redirect to /products after clicking products button', function () {
            const url = '/products';
            const title = 'Products';
            cy.contains('products-button').click();
            cy.url({timeout: 10000}).should('include', url);
            cy.title().should('eq', title);
        });

    });
    context('search tests', () => {
        beforeEach(() => {
            cy.visit('/products');
        });

        it('Should search based on search field input', () => {
            const searchPhrase = 'lego'
            cy.get('search-input')
                .type(searchPhrase + 'Cypress.io{enter}')
                .should('have.value', searchPhrase);


            cy.get('ul').its('length').should('be.gte', 1);
        });

        it('Should search based on search field input using a button', () => {
            const searchPhrase = 'lego'
            cy.get('search-input')
                .type(searchPhrase)
                .should('have.value', searchPhrase);

            cy.get('search-submit').click();
            cy.get('ul').its('length').should('be.gte', 1);
        });

        it('Should display a message that there is no matching products', () => {
            const searchPhrase = 'XV-wieczna zbroja plytowa'
            cy.get('search-input')
                .type(searchPhrase)
                .should('have.value', searchPhrase);

            cy.get('search-submit').click();

            cy.get('no-results').should('be.visible');
            cy.get('no-results').should('have.text','There is no products matching:' + searchPhrase);

            cy.get('ul').its('length').should('be.gte', 1);
        });

        it('Should grey products that are not available any more', () => {
            const searchPhrase = 'szachownica'
            cy.get('search-input')
                .type(searchPhrase)
                .should('have.value', searchPhrase);

            cy.get('search-submit').click();
            cy.get('ul').should('have.length', 1);
            cy.get('li:contains("Szachownica")').should('have.css', 'color', 'gray')
        });
    });
});