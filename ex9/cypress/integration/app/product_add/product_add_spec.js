describe('/product/add page test', function() {
    context('Add product', () => {
        beforeEach(() => {
            cy.visit('/product/add')
        })

        it('Should add product after user confirmation', () => {

            const productName='big book';
            const category='books';
            const price='200';
            const photo='https://images-na.ssl-images-amazon.com/images/I/51tUd26IhsL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg';
            const url='/product/user';
            const title = 'Your products Page';
            cy.get('input[name="name"]')
                .type(productName)
                .should('have.value', productName);

            cy.get('input[name="category"]')
                .type(category)
                .should('have.value', category);

            cy.get('input[name="price"]')
                .type(price)
                .should('have.value',price);

            cy.get('input[name="fileName"]')
                .type(photo)
                .should('have.value', photo);

            cy.get('dropdown[name="Currency"]').click();
            cy.get('product-currency').contains('PLN').click();

            cy.get('confirm')
                .should('exist')
                .and('be.visible')
                .click();

            cy.url().should('contain', url);
            cy.title().should('eq', title);
        });

        it('Should show error if price is not a number', () => {

            const productName='big book';
            const category='books';
            const price='abc';
            const photo='https://images-na.ssl-images-amazon.com/images/I/51tUd26IhsL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg';
            const url='/product/user';
            const title = 'Your products Page';
            cy.get('input[name="name"]')
                .type(productName)
                .should('have.value', productName);

            cy.get('input[name="category"]')
                .type(category)
                .should('have.value', category);

            cy.get('input[name="price"]')
                .type(price)
                .should('have.value',price);

            cy.get('input[name="fileName"]')
                .type(photo)
                .should('have.value', photo);

            cy.get('dropdown[name="Currency"]').click();
            cy.get('product-currency').contains('PLN').click();

            cy.get('confirm')
                .should('exist')
                .and('be.visible')
                .click();

            cy.get('price-error').should('be.visible');
            cy.get('price-error').should('have.text',"price is not a number");
            cy.url().should('contain', url);
            cy.title().should('eq', title);
        });

        it('Should show error if product name is missing', () => {

            const productName='';
            const category='books';
            const price='200';
            const photo='https://images-na.ssl-images-amazon.com/images/I/51tUd26IhsL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg';
            const url='/product/user';
            const title = 'Your products Page';
            cy.get('input[name="name"]')
                .type(productName)
                .should('have.value', productName);

            cy.get('input[name="category"]')
                .type(category)
                .should('have.value', category);

            cy.get('input[name="price"]')
                .type(price)
                .should('have.value',price);

            cy.get('input[name="fileName"]')
                .type(photo)
                .should('have.value', photo);

            cy.get('dropdown[name="Currency"]').click();
            cy.get('product-currency').contains('PLN').click();

            cy.get('confirm')
                .should('exist')
                .and('be.visible')
                .click();

            cy.get('empty-name-error').should('be.visible');
            cy.get('empty-name-error').should('have.text',"product name is empty");
            cy.url().should('contain', url);
            cy.title().should('eq', title);
        });

        it('Should show error if photo is empty name is missing', () => {

            const productName='big book';
            const category='books';
            const price='200';
            const photo='';
            const url='/product/user';
            const title = 'Your products Page';
            cy.get('input[name="name"]')
                .type(productName)
                .should('have.value', productName);

            cy.get('input[name="category"]')
                .type(category)
                .should('have.value', category);

            cy.get('input[name="price"]')
                .type(price)
                .should('have.value',price);

            cy.get('input[name="fileName"]')
                .type(photo)
                .should('have.value', photo);

            cy.get('dropdown[name="Currency"]').click();
            cy.get('product-currency').contains('PLN').click();

            cy.get('confirm')
                .should('exist')
                .and('be.visible')
                .click();

            cy.get('empty-photo-error').should('be.visible');
            cy.get('empty-photo-error').should('have.text',"you need to provide a photo for your product");
            cy.url().should('contain', url);
            cy.title().should('eq', title);
        });

        it('Should redirect to /product/user after canceling adding product', () => {

            const url='/product/user';
            const title = 'Your products Page';

            cy.get('cancel')
                .shoul('exist')
                .and('be.visible')
                .click();

            cy.url().should('contain', url);
            cy.title().should('eq', title);
        });
    })
})