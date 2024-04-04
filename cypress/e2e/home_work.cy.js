import {faker} from '@faker-js/faker';

context('QA auto', () => {
    const password = faker.internet.password({length: 10}) + 'Q1q';
    const FirstName = faker.string.alpha(10);
    const LastName = faker.string.alpha(10);

    beforeEach(() => {
        cy.visit('https://guest:welcome2qauto@qauto.forstudy.space')
    })
    it('Home work', () => {

        // Create user
        cy.get('.hero-descriptor_btn').should('contain', 'Sign up')
            .should('exist')
            .click();
        cy.get('.modal-title')
            .should('contain', 'Registration')
            .should('exist');

        cy.get('#signupName').type(FirstName);
        cy.get('#signupLastName').type(LastName);
        cy.get('#signupEmail').type(faker.internet.email());
        cy.get('#signupPassword').type(password);
        cy.get('#signupRepeatPassword').type(password);
        cy.get('.modal-footer > .btn')
            .should('contain', 'Register')
            .click();

        cy.get('.alert > p').should('contain', 'Registration complete')

        // Go to the profile and check that the name and lastName are the same as when you registered
        cy.get('.-profile')
            .should('contain', 'Profile')
            .click();

        cy.get('.profile_name').should('contain', FirstName + ' ' + LastName)

        // add any car
        cy.get('[routerlink="garage"]')
            .should('contain', 'Garage')
            .click();

        cy.get('.panel-page_heading > .btn')
            .should('contain', 'Add car')
            .click();

        cy.get('.modal-title').should('contain', 'Add a car');
        cy.get('#addCarBrand').select('BMW');
        cy.get('#addCarModel').select('X5');
        cy.get('#addCarMileage').type(parseInt(faker.number.bigInt({min: 1n, max: 10n})));
        cy.get('.modal-footer > .btn-primary')
            .should('contain', 'Add')
            .click();

        cy.get('.alert > p').should('contain', 'Car added')

        // add expenses to this car
        cy.get('.car_add-expense').should('contain', 'Add').click();
        cy.get('#addExpenseMileage').type(parseInt(faker.number.bigInt({min: 11n, max: 20n})))
        cy.get('#addExpenseLiters').type(parseInt(faker.number.bigInt({min: 21n, max: 30n})));
        cy.get('#addExpenseTotalCost').type(parseInt(faker.number.bigInt({min: 31n, max: 40n})))
        cy.get('.modal-footer > .btn-primary')
            .should('contain','Add')
            .click();

        cy.get('.alert > p').should('contain', 'Fuel expense added')

        // Delete user
        cy.get('[routerlink="settings"]')
            .should('contain', 'Settings')
            .click();

        cy.get('.user-settings_form > .btn')
            .should('contain', 'Remove my account')
            .click();

        cy.get('.btn-danger')
            .should('contain', 'Remove')
            .click();

        cy.get('.alert > p').should('contain', 'User account has been removed')
    })

})

