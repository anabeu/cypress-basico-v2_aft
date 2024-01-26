it.only('Teste21 - Testa a página da política de privacidade removendo o target e então clicando o link', function () {
    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')
})