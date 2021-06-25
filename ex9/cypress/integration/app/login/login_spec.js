describe('/login page test', function() {
    context('home to login', () => {
        beforeEach(() => {
            cy.visit('/home');
        });
        it('Should redirect to /login after clicking login button', function () {
            const url = '/login';
            const title = 'Login Page';
            cy.contains('login-button').click();
            cy.url({ timeout: 10000 }).should('include', url);
            cy.title().should('eq', title);
        });
    })

    context('login tests', () => {
        beforeEach(() => {
            cy.visit('/login');
        });

        it('Should have inputs for password and username and submit button', function () {
            cy.get('username').should("exist")
            cy.get('password').should("exist")
            cy.get('login-submit').should("exist")
        });

        it('Should redirect to /home after submiting correct login info', function () {
            const username='adam123';
            const password='Ligma123';
            const url='/home';
            const title = 'Home Page';
            cy.get('username')
                .type(username)
                .should('have.value', username);

            cy.get('password')
                .type(password)
                .should('have.value', password);

            cy.get('login-submit').click();
            cy.url({ timeout: 10000 }).should('include', url);
            cy.title().should('eq', title);
        });

        it('Should display information about not existing user', () => {
            const username='test';
            const password='test';
            const url='/login';
            const title = 'Login Page';
            cy.get('username')
                .type(username)
                .should('have.value', username);

            cy.get('password')
                .type(password)
                .should('have.value', password);

            cy.get('login-submit').click();

            cy.get('wrong-credentials-error').should('be.visible');
            cy.get('wrong-credentials-error').should('have.text',"There is no user with this credentials");

            cy.url({ timeout: 10000 }).should('include', url);
            cy.title().should('eq', title);
        });

        it('Should lock account after multiple failed attempts to log in', () => {
            const username='adam123';
            const wrongPassword='Abcdef123';
            const correctPassword='Ligma123';
            const url='/login';
            const title = 'Login Page';
            for (let i = 0; i < 5 ; i++) {
                cy.get('username')
                    .type(username)
                    .should('have.value', username);

                cy.get('password')
                    .type(wrongPassword)
                    .should('have.value', wrongPassword);

                cy.get('login-submit').click();

                cy.get('wrong-credentials-error').should('be.visible');
                cy.get('wrong-credentials-error').should('have.text',"Wrong password");
            }

            cy.get('username')
                .type(username)
                .should('have.value', username);

            cy.get('password')
                .type(correctPassword)
                .should('have.value', correctPassword);

            cy.get('login-submit').click();

            cy.get('account-locked-error').should('be.visible');
            cy.get('account-locked-error').should('have.text',"Your account was locked, because of multiple failed log ons, please check out your email for further information on how to unlock your account");

            cy.url({ timeout: 10000 }).should('include', url);
            cy.title().should('eq', title);
        });
    });
})
