import '@4tw/cypress-drag-drop';

/* 
  Os testes automatizados implementados seguem o princípio da independência, garantindo que cada teste possa ser executado de forma isolada, sem dependências diretas em relação à execução de outros testes. 

  Esse paradigma, conhecido como testes independentes e idempotentes, assegura que qualquer alteração realizada durante a execução de um teste seja devidamente revertida ao seu estado original ao final do mesmo. Dessa forma, evitamos efeitos colaterais entre diferentes testes, tornando a suíte de testes mais confiável, previsível e modular.

  A adoção dessa abordagem permite que os testes sejam executados em qualquer ordem, paralelamente ou individualmente, sem comprometer a integridade do ambiente de testes. Além disso, melhora a manutenção do código, facilita a depuração e reduz a possibilidade de falhas intermitentes devido a estados persistentes entre execuções.

  Esse método é especialmente relevante em ambientes de integração contínua (CI/CD), onde a confiabilidade e a reprodutibilidade dos testes são fundamentais para garantir a qualidade do software.
*/



describe('List and Task Management', () => {
  beforeEach(() => {
    // Visit the application before each test
    cy.visit('http://localhost:3000');
  });

  /* Teste para criar uma nova LISTA*/
  it('should create a new list', () => {
    cy.get('[data-testid="new-list-button"]').click();
    cy.get('[data-testid="list-title-input"]').type('New List Title{enter}');
    cy.contains('New List Title').should('exist');
    
    /* Deletes the created list */
    cy.get('[data-testid="list-options-button"]').click();
    cy.get('[data-testid="list-options-delete-button"]').click();
    cy.get('[data-testid="list-options-confirm-delete-button"]').click();
    cy.contains('New List Title').should('not.exist');
  });

  /* Teste para criar uma TASK */
  it('should create a new task in a list', () => {

    //Creates the list
    cy.get('[data-testid="new-list-button"]').click();
    cy.get('[data-testid="list-title-input"]').type('New List Title{enter}');
    cy.contains('New List Title').should('exist');

    //Creates the task inside the list
    cy.get('[data-testid="new-task-button"]').first().click();
    cy.get('[data-testid="task-title-text"]').click().get('[data-testid="task-title-input"]').clear().type('New Task Title');
    cy.get('[data-testid="task-description-text"]').click().get('[data-testid="task-description-input"]').clear().type('New Task Description');
    cy.get('[data-testid="task-modal"]').within( () => {
      cy.get('[data-testid="save-task-button"]').first().click();
    })
    cy.contains('New Task Title').should('exist');

    //Deletes the list and task
    cy.get('[data-testid="list-options-button"]').click();
    cy.get('[data-testid="list-options-delete-button"]').click();
    cy.get('[data-testid="list-options-confirm-delete-button"]').click();
    cy.contains('New List Title').should('not.exist');
    cy.contains("New Task Title").should('not.exist')
  });

  /* Teste para editar uma TASK */
  it('should edit a task in a list', () => {
     //Creates the list
     cy.get('[data-testid="new-list-button"]').click();
     cy.get('[data-testid="list-title-input"]').type('New List Title{enter}');
     cy.contains('New List Title').should('exist');
 
     //Creates the task inside the list
     cy.get('[data-testid="new-task-button"]').first().click();
     cy.get('[data-testid="task-title-text"]').click().get('[data-testid="task-title-input"]').clear().type('New Task Title');
     cy.get('[data-testid="task-description-text"]').click().get('[data-testid="task-description-input"]').clear().type('New Task Description');
     cy.get('[data-testid="task-modal"]').within( () => {
       cy.get('[data-testid="save-task-button"]').first().click();
     })
     cy.contains('New Task Title').should('exist');

      //Edits the list
      cy.get('[data-testid="task-card"]').first().rightclick();
      cy.get('[data-testid="edit-task-button"]').click();
      cy.get('[data-testid="task-title-text"]').click().get('[data-testid="task-title-input"]').clear().type('Updated Task Title');
      cy.get('[data-testid="task-modal"]').within( () => {
      cy.get('[data-testid="save-task-button"]').first().click();
    })
    cy.contains('Updated Task Title').should('exist');

    //Deletes the list and task
    cy.get('[data-testid="list-options-button"]').click();
    cy.get('[data-testid="list-options-delete-button"]').click();
    cy.get('[data-testid="list-options-confirm-delete-button"]').click();
    cy.contains('New List Title').should('not.exist');
    cy.contains("Updated Task Title").should('not.exist')
  });

  /* Teste para duplicar uma TASK */
  it('should duplicate a task in a list', () => {
     //Creates the list
     cy.get('[data-testid="new-list-button"]').click();
     cy.get('[data-testid="list-title-input"]').type('New List Title{enter}');
     cy.contains('New List Title').should('exist');
 
     //Creates the task inside the list
     cy.get('[data-testid="new-task-button"]').first().click();
     cy.get('[data-testid="task-title-text"]').click().get('[data-testid="task-title-input"]').clear().type('New Task Title');
     cy.get('[data-testid="task-description-text"]').click().get('[data-testid="task-description-input"]').clear().type('New Task Description');
     cy.get('[data-testid="task-modal"]').within( () => {
       cy.get('[data-testid="save-task-button"]').first().click();
     })
     cy.contains('New Task Title').should('exist');


    cy.get('[data-testid="task-card"]').first().rightclick();
    cy.get('[data-testid="duplicate-task-button"]').click();
    cy.get('[data-testid="task-card-title"]').each(($ele, $list) => {
      expect($ele).to.have.text("New Task Title")
    }).then(($list) => {
      expect($list).to.have.length(2)
    });

    //Deletes the list and task
    cy.get('[data-testid="list-options-button"]').click();
    cy.get('[data-testid="list-options-delete-button"]').click();
    cy.get('[data-testid="list-options-confirm-delete-button"]').click();
    cy.contains('New List Title').should('not.exist');
    cy.contains("New Task Title").should('not.exist')
  });

  /* Teste para deletar uma TASK */
  it('should delete a task in a list', () => {
    //Creates the list
    cy.get('[data-testid="new-list-button"]').click();
    cy.get('[data-testid="list-title-input"]').type('New List Title{enter}');
    cy.contains('New List Title').should('exist');

    //Creates the task inside the list
    cy.get('[data-testid="new-task-button"]').first().click();
    cy.get('[data-testid="task-title-text"]').click().get('[data-testid="task-title-input"]').clear().type('New Task Title');
    cy.get('[data-testid="task-description-text"]').click().get('[data-testid="task-description-input"]').clear().type('New Task Description');
    cy.get('[data-testid="task-modal"]').within( () => {
      cy.get('[data-testid="save-task-button"]').first().click();
    })
    cy.contains('New Task Title').should('exist');

    //Deletes the Task
    cy.get('[data-testid="task-card"]').first().rightclick();
    cy.get('[data-testid="delete-task-button"]').click();
    cy.contains("New Task Title").should('not.exist')

    //Deletes the list
    cy.get('[data-testid="list-options-button"]').click();
    cy.get('[data-testid="list-options-delete-button"]').click();
    cy.get('[data-testid="list-options-confirm-delete-button"]').click();
    cy.contains('New List Title').should('not.exist');
  });

  it('should move a task from one list to another', () => {
    // Create two lists
    cy.get('[data-testid="new-list-button"]').click();
    cy.get('[data-testid="list-title-input"]').type('List 1{enter}');
    cy.contains('List 1').should('exist');
  
    cy.get('[data-testid="new-list-button"]').click();
    cy.get('[data-testid="list-title-input"]').type('List 2{enter}');
    cy.contains('List 2').should('exist');
  
    // Create a task in List 1
    cy.get('[data-testid="new-task-button"]').first().click();
    cy.get('[data-testid="task-title-text"]').click().get('[data-testid="task-title-input"]').clear().type('Task to Move');
    cy.get('[data-testid="task-description-text"]').click().get('[data-testid="task-description-input"]').clear().type('New Task Description');
    cy.get('[data-testid="task-modal"]').within(() => {
      cy.get('[data-testid="save-task-button"]').first().click();
    });
    cy.contains('Task to Move').should('exist');
  
    // Drag and drop the task from List 1 to List 2
    cy.get('[data-testid="task-card"]').first().drag('[data-testid="list-container"]:eq(1)');
  
    // Verify the task has moved to List 2
    cy.get('[data-testid="list-container"]').eq(1).contains('Task to Move').should('exist');

    //Deletes the list 1 and 2
    cy.get('[data-testid="list-options-button"]').eq(0).click();
    cy.get('[data-testid="list-options-delete-button"]').eq(0).click();
    cy.get('[data-testid="list-options-confirm-delete-button"]').eq(0).click();
    cy.contains('List 1').should('not.exist');

    cy.get('[data-testid="list-options-button"]').eq(0).click();
    cy.get('[data-testid="list-options-delete-button"]').eq(0).click();
    cy.get('[data-testid="list-options-confirm-delete-button"]').eq(0).click();
    cy.contains('List 1').should('not.exist');
  });
});