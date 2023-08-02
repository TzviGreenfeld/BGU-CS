describe("End-to-End Testing", () => {
  const uniqueString = Date.now().toString();
  const username = "username_" + uniqueString;
  const email = "email_" + uniqueString + "_@mail.com";

  const notLoggedInMessage = "You need to be authenticated to view this page.";

  it("should try to access pages while logged out, sinup login and try again, and then logout and try agian", () => {
    // signup
    cy.visit("http://localhost:3000/");
    cy.url().should("include", "localhost:3000/1");

    cy.wait(1500); // hot fix for the redirect issue

    cy.contains("Sign up").click();
    cy.url().should("include", "/signup");

    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type("testpassword");
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="name"]').type("Test User");

    cy.contains("Register").click();
    cy.url().should("include", "/login");

    // login
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type("testpassword{enter}");
    cy.url().should("include", "localhost:3000/1");

    // go to next page
    cy.get(".pagination-button").contains(">").click();
    cy.url().should("include", "localhost:3000/2");

    // go to specific page
    const pageNum = 3;

    cy.get(".pagination-button").contains(pageNum).click();
    cy.url().should("include", `localhost:3000/${pageNum}`);

    // logout
    cy.contains("Log out").click();
    cy.url().should("include", "localhost:3000/1");
    cy.contains("Log in");
    cy.contains("Sign up");
    cy.contains("Log out").should("not.exist");
    cy.contains("Profile").should("not.exist");
  });
});
