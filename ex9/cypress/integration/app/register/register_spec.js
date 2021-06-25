describe('/register page test', function() {
    context('home to register', () => {
        beforeEach(() => {
            cy.visit('/home');
        });
        it('Should redirect to /register after clicking register button', function () {
            const url = '/register';
            const title = 'Register Page';
            cy.contains('register-button').click();
            cy.url({ timeout: 10000 }).should('include', url);
            cy.title().should('eq', title);
        });
    })

    context('login tests', () => {
        beforeEach(() => {
            cy.visit('/register');
        });

        it('Should have inputs for password, email, username and submit button', function () {
            cy.get('email').should("exist");
            cy.get('username').should("exist");
            cy.get('password').should("exist");
            cy.get('login-submit').should("exist");
        });

        it('Should redirect to /home after submiting credentials', function () {
            const username='adam123';
            const password='Ligma123';
            const email='adam123@gmail.com';
            const url='/home';
            const title = 'Home Page';
            cy.get('email')
                .type(email)
                .should('have.value', email);

            cy.get('username')
                .type(username)
                .should('have.value', username);

            cy.get('password')
                .type(password)
                .should('have.value', password);

            cy.get('register-submit').click();
            cy.url({ timeout: 10000 }).should('include', url);
            cy.title().should('eq', title);
        });

        it('Should show password requirements if password is too short', function () {
            const username='adam123';
            const password='a';
            const email='adam123@gmail.com';
            const url='/register';
            const title = 'Register Page';
            cy.get('email')
                .type(email)
                .should('have.value', email);

            cy.get('username')
                .type(username)
                .should('have.value', username);

            cy.get('password')
                .type(password)
                .should('have.value', password);



            cy.get('login-submit').click();
            cy.get('password-validation-error').should('be.visible');
            cy.get('password-validation-error').should('have.text',"The password should be at least 8 characters long and include at least: 1 small letter, 1 big letter, 1 number");

            cy.url({ timeout: 10000 }).should('include', url);
            cy.title().should('eq', title);
        });

        it('Should redirect to accounts.google after clicking register with google', function () {
            const url='/accounts.google.com';

            cy.get('google-login-btn')
                .should('exist')
                .should('be.visible')
                .click()
            cy.url({ timeout: 10000 }).should('include', url);
        });
    });
})