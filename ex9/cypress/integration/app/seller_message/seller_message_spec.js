describe('/messages page test', function() {
    context('home to messages', () => {
        beforeEach(() => {
            cy.visit('/home');
        });
        it('Should redirect to /messages after clicking products button', function () {
            const url = '/messages';
            const title = 'Your messages';
            cy.contains('messages-button').click();
            cy.url({timeout: 10000}).should('include', url);
            cy.title().should('eq', title);
        });

    });
    context('messages unlogged test', () => {
        it('Should hide message button if not logged in', function () {
            cy.visit('/home');
            cy.get('messages')
                .should("exist")
                .should("not.be.visible");
            cy.visit('/messages');
            cy.get('not-logged-error').should('be.visible');
            cy.get('not-logged-error').should('have.text',"You have to be logged in in order to view messages");
        });
    });

    context('messages tests', () => {
        beforeEach(() => {
            const username='adam123';
            const password='Ligma123';

            cy.visit('/login');
            cy.get('username')
                .type(username);

            cy.get('password')
                .type(password);
            cy.get('login-submit').click();
            cy.visit('/messages');
        });

        it('Should return messages that user received', () => {
            cy.get('ul').its('length').should('be.gte', 1);
            cy.get('li:contains("Hello adam123!")').should('exist');
        });

        it('Should search messages based on search input', () => {
            const searchPhrase = 'Hello there'
            cy.get('search-input')
                .type(searchPhrase)
                .should('have.value', searchPhrase);

            cy.get('search-submit').click();
            cy.get('ul').its('length').should('be.gte', 1);
            cy.get('li:contains("Hello there. General Kenobi")').should('exist');
        });

        it('Should delete all messages after clicking the delete all messages button', () => {
            cy.get('ul').its('length').should('be.gte', 1);
            cy.get('delete-all').click();
            cy.get('confirm').click();
            cy.get('ul').should('have.length', 0);
            cy.get('no-messages').should('be.visible');
            cy.get('no-messages').should('have.text',"You have 0 messages");
        });
    });
});