describe('My First Test', function() {
    it('Does not do much', function() {
        cy.visit('http://localhost:3000')
        cy.contains('Add Material').click()
        cy.url()
            .should('include', '/addMaterial')

        cy.get(':nth-child(1) > .form-control')
            .type('#20190409')
            .should('have.value', '#20190409')
        
        cy.get(':nth-child(2) > .form-control')
            .type('S1')
            .should('have.value', 'S1') 
        
        cy.get(':nth-child(3) > .form-control')
            .type('256')
            .should('have.value', '256')
        
        cy.get(':nth-child(5) > .form-control')
            .type('2')
            .should('have.value', '2')
    
        cy.wait(500)

        cy.get('.btn')
            .click()
        
        cy.wait(500)

        cy.visit('http://localhost:3000')
    })
})