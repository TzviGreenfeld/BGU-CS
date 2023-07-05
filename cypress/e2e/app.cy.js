describe('Navigation', () => {
    const navBarLinks = [['signup', 'Sign Up'], ['login', 'Log In']];
    navBarLinks.forEach((route) =>{
        it(`should navigate to the ${route[0]} page`, () => {
          // Start from the index page
          cy.visit('http://localhost:3000/')
       
          // Find a link with an href attribute containing "about" and click it
          cy.get(`a[href*="${route[0]}"]`).click()
       
          // The new url should include "/about"
          cy.url().should('include', `/${route[0]}`)
       
          // The new page should contain an h1 with "About page"
          cy.get('h1').contains(route[1])
        })
    })
  })