describe("End-to-End Testing", () => {
  it("should navigate through the signup, login, profile and then change profile picture", () => {
    cy.visit("http://localhost:3000/");
    cy.url().should("include", "localhost:3000/1");

    cy.contains("Sign up").click();
    cy.url().should("include", "/signup");

    const uniqueString = Date.now().toString();
    const username = "username_" + uniqueString;
    const email = "email_" + uniqueString + "_@mail.com";

    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type("testpassword");
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="name"]').type("Test User");

    // Step 4: Make sure it's redirected to "login" page
    // cy.get("form").submit();
    cy.contains("Register").click();
    cy.url().should("include", "/login");

    // Step 5: Login with the credentials from before
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type("testpassword{enter}");

    /// redirect to home
    cy.url().should("include", "localhost:3000/1");

    // Step 6: Navigate to "profile" page
    cy.contains("Profile").click();
    cy.url().should("include", "/profile");

    // Step 7: Make sure the details from before are presented in the profile page
    cy.contains(username);
    cy.contains(email);
    cy.contains("Test User");

    
    // Step 8: upload new profile picture, save the old src attribute to compare to the new one
    cy.get(".profilePic")
      .should("have.attr", "src")
      .then((originalSrc) => {
        // Step 9: Trigger the file upload event and select a file
        cy.get("#profilePicInput")
          .invoke("removeAttr", "style")
          .click({ force: true }); // without it i cant upload image with cypress because of hidden element
        cy.get("#profilePicInput").selectFile(
          ["cypress/e2e/robotProfile.png"],
          {
            force: true,
          }
        );

        // Step 10: Assert the image upload success and check the updated profile picture
        cy.get(".profilePic")
          .should("have.attr", "src")
          .should("not.eq", originalSrc);
      });

    // Step 10: Logout and make sure redirected to home page as guest
    cy.contains("Log out").click();
    cy.url().should("include", "localhost:3000/1");
    cy.contains("Log in");
    cy.contains("Sign up");
    cy.contains("Log out").should("not.exist");
    cy.contains("Profile").should("not.exist");
  });
});
