

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  });
  it('verifica o título da aplicação', () => {
cy.title('').should('be.equal','Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios e envia o formulário ',() => {
    cy.clock()
    const longText = Cypress._.repeat('Testes iniciais em Cypress e aprendizagem',10)
    cy.get('#firstName').type('Paloma Testes')
    cy.get('#lastName').type('Milan')
    cy.get('#email').type('paloma.milan@yahoo.com.br')
    cy.get('#open-text-area').type(longText, {delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.contains('Mensagem enviada com sucesso').should('be.visible');
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
    
  }) 

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',() => {
    cy.clock()
    cy.get('#firstName').type('Paloma Testes')
    cy.get('#lastName').type('Milan')
    cy.get('#email').type('paloma.milan@yahoo,com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.contains('Valide os campos obrigatórios!').should('be.visible');
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
})

  it('Campo Telefone Permanece Vazio quando preenche com valor não numérico ',() => {
    cy.get('#phone').type('ABCDESERT').should('have.value','')
  })

  it('Mensagem de erro para o campo obrigatório do "telefone" mais não houve preenchimento', () => {
    cy.clock()
    cy.get('#firstName').type('Paloma Testes')
    cy.get('#lastName').type('Milan')
    cy.get('#email').type('paloma.milan@yahoo.com.br')
    cy.get('#open-text-area').type('Teste')
    cy.get('[for="phone-checkbox"]').click()
    cy.contains('button', 'Enviar').click()

    cy.contains('Valide os campos obrigatórios!').should('be.visible');
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
})

it('preenche e limpa os campos nome, sobrenome, email e telefone ',() => {
  cy.get('#firstName').type('Paloma Testes').should('have.value','Paloma Testes')
.clear()
.should('have.value','')
  cy.get('#lastName').type('Milan').should('have.value','Milan')
.clear()
.should('have.value','')
  cy.get('#email').type('paloma.milan@yahoo.com.br').should('have.value','paloma.milan@yahoo.com.br')
.clear()
.should('have.value','')
  cy.get('#phone').type('11991871220').should('have.value','11991871220')
.clear()
.should('have.value','')
})

it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',() => {
  cy.clock()
  cy.contains('button', 'Enviar').click()

  cy.contains('Valide os campos obrigatórios!').should('be.visible');
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
})

it('envia o formuário com sucesso usando um comando customizado',() => {
  cy.clock()
  const userData = {
    firstName: 'Paah',
    lastName: 'Caju',
    email: 'paah@DataTransferItemList.com',
    text: 'Testes01.'
  }
  cy.fillMandatoryFieldsAndSubmit(userData)

  cy.contains('Valide os campos obrigatórios!').should('be.visible');
  cy.tick(3000)
  cy.get('.error').should('not.be.visible')

})


it('envia o formuário com sucesso usando um comando customizado 7.1',() => {
  cy.clock()
  const userData = {
    firstName: 'Paah',
    lastName: 'Caju',
    email: 'paah@DataTransferItemList.com',
    text: 'Testes01.'
  }
  cy.fillMandatoryFieldsAndSubmit(userData)

  cy.contains('Valide os campos obrigatórios!').should('be.visible');
  cy.tick(3000)
  cy.get('.error').should('not.be.visible')

})
 it('seleciona um produto (YouTube) por seu texto', () => {
  cy.get('#product').select('YouTube').should('have.value', 'youtube')
 })

 it('seleciona um produto (Mentoria) por seu valor (value)',() =>{
  cy.get('#product').select('Mentoria').should('have.value', 'mentoria')

 })

it('seleciona um produto (Blog) por seu índice',() =>{
  cy.get('#product').select(1 )
.should('have.value', 'blog')

})

it('marca o tipo de atendimento "Feedback"',() =>{
  cy.get(':nth-child(4) > input').check()
  .should('be.checked')

})

it('marca cada tipo de atendimento',() =>{
cy.get('input[type="radio"] ')
  .each(typeOfService =>{
    cy.wrap(typeOfService)
    .check() 
    .should('be.checked')
  })
})

it('marca ambos checkboxes, depois desmarca o último',() =>{
cy.get('input[type="checkbox"]')
.check()
.should('be.checked')
.last()
.uncheck()
.should('not.be.checked')
})

it( 'seleciona um arquivo da pasta fixtures',() =>{
  cy.get('#file-upload')
  cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
  .should(input =>{
    expect(input[0].files[ 0].name).to.equal('example.json')
  })
})
it( 'seleciona um arquivo simulando um drag-and-drop',() =>{
  cy.get('#file-upload')
  cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json',{action:'drag-drop'})
  .should(input =>{
    expect(input[0].files[ 0].name).to.equal('example.json')
  })
})

it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',() =>{
  cy.fixture('example.json').as('paahFile')
  cy.get('#file-upload')
  .selectFile('@paahFile')
  .should(input =>{
    expect(input[0].files[ 0].name).to.equal('example.json')
  })
})

it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
cy.contains('Política de Privacidade').click()
.should('have.attr','href','privacy.html')
  .and('have.attr','target','_blank')
})

it('acessa a página da política de privacidade removendo o target e então clicando no link', () =>{
cy.contains( 'Política de Privacidade').invoke('removeAttr', 'target')
.click()

cy.contains('h1','CAC TAT - Política de Privacidade').should('be.visible')
})

it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () =>{
  cy.get('.success')
  .should('not.be.visible')
  .invoke('show')
  .should('be.visible')
  .and('contain', 'Mensagem enviada com sucesso.')
  .invoke('hide')
  .should('not.be.visible')
cy.get('.error')
  .should('not.be.visible')
  .invoke('show')
  .should('be.visible')
  .and('contain', 'Valide os campos obrigatórios!')
  .invoke('hide')
  .should('not.be.visible')
})

it('preenche o campo da área de texto usando o comando invoke.', () =>{

  cy.get('#open-text-area').invoke('val', 'um texto qualquer')
  .should('have.value', 'um texto qualquer')

})

it('faz uma requisição HTTP', () =>{

cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
.as('getrequest')
.its('status').should('be.equal',200)
cy.get('@getrequest')
.its('statusText').should('be.equal','OK')
cy.get('@getrequest')
.its('body').should('include','CAC TAT')
})

it('Encontra o gato escondido', () =>{
cy.get('#cat')
.invoke('show')
.should('be.visible')
cy.get('#title')
.invoke('text','CAT TAT')
cy.get('#subtitle')
.invoke( 'text', 'Adicionar novas informações')
})
})