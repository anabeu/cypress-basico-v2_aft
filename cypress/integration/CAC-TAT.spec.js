// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de atendimento ao Cliente TAT', function () {
    beforeEach(function () { cy.visit('./src/index.html') })

    it('Teste0 - Verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('Teste1 - Preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste'
        cy.get('#firstName').type('Ana')
        cy.get('#lastName').type('Teles')
        cy.get('#email').type('ateles@teste.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('Teste2 - Exibe mensagem de erro ao submeter o formulário com um email com formatação', function () {
        cy.get('#firstName').type('Ana')
        cy.get('#lastName').type('Teles')
        cy.get('#email').type('ateles@teste,com')
        cy.get('#open-text-area').type('Teste')
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Teste3 - Campo telefone continua vazio quando preenchido com valor não numérico', function () {
        cy.get('#phone').type('dfgdfgdf').should('have.value', '')
    })

    it('Teste4 - Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Ana')
        cy.get('#lastName').type('Teles')
        cy.get('#email').type('ateles@teste.com')
        cy.get('#phone-checkbox').click() //ao marcar esta checkbox o campo Telefone torna-se de preenchimento obrigatório
        cy.get('#open-text-area').type('Teste')
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('Teste5 - Preenche e limpa os campos ,nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('Ana')
            .should('have.value', 'Ana')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Teles')
            .should('have.value', 'Teles')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('ateles@test.com')
            .should('have.value', 'ateles@test.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('1234567890')
            .should('have.value', '1234567890')
            .clear()
            .should('have.value', '')
    })
    it('Teste6 - Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    //Comandos customizados (Custom Commands na documentação oficial do Cypress)
    it('Teste7 - Envia o formulário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    //Teste8 - substituição de cy.get por cy.contains nos testes anteriores, no comando do botão

    it('Teste9 - Selecciona um produto (YouTube) por seu texto', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })
    it('Teste10 - Selecciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })
    it('Teste11 - Selecciona um produto (Mentoria) por seu índice', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })
    it('Teste12 - Marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]').check()
            .check()
            .should('have.value', 'feedback')
    })
    it('Teste13 - Marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })
    it('Teste14 - Marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('Teste15 - Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Ana')
        cy.get('#lastName').type('Teles')
        cy.get('#email').type('ateles@teste.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Teste16 - Selecciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('Teste17 - Selecciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Teste18 - Selecciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Teste19 - Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    //No próximo teste há que perceber que o user ao clicar no link da Politica de privacidade, irá abrir uma nova tab do browser 
    //contudo o cypress está a correr na tab principal do CAC TAT, o que fica difícil fazer validações do que aparece na tab de Politica de Privacidade, 
    //uma vez que o cypress não está a ser executado lá.
    //O que faz isso acontecer é a existência do target na tag que contém o link da Politica de Privacidade e por isso temos de forçar a página de Politica 
    //de Privacidade a abrir na página do CAC TAT que é onde o Cypress está a rodar.Daí no comando abaixo termos a remoção do atributo target.
    it('Teste20 - Acessa a página da política de privacidade removendo o target e então clicando no link', function () {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing').should('be.visible')
    })
    //Teste21 encontra-se na feature: privacy.spec.js
    it('Teste22 - Acessa a página da política de privacidade removendo o target e então clicando no link', function () {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing').should('be.visible')
    })

})