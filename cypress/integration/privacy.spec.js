it('Teste21 - Testa a página da política de privacidade removendo o target e então clicando o link', function () {
    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')
})

Cypress._.times(5, function () {
    it('Teste24 - Testa a página da política de privacidade removendo o target e então clicando o link', function () {
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    })
})
