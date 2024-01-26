Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Ana')
    cy.get('#lastName').type('Teles')
    cy.get('#email').type('ateles@teste.com')
    cy.get('#open-text-area').type('Test')
    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()
})
