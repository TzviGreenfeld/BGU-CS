describe("End-to-End Testing", () => {
  it("should navigate through the signup, login, profile, and create pages", () => {
    // Step 1: Go to http://localhost:3000/
    cy.visit("http://localhost:3000/");
    // wait for the redirect
    cy.url().should("include", "localhost:3000/1");

    // Step 2: Navigate to the "signup" page
    cy.contains("Sign up").click();
    cy.url().should("include", "/signup");

    const uniqueString = Date.now().toString();
    const username = "username_" + uniqueString;
    const email = "email_" + uniqueString + "_@mail.com";

    // Step 3: Fill in username, password, email, name
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
    // cy.get("form").submit();

    /// redirect to home
    cy.url().should("include", "localhost:3000/1");

    // Step 7: Navigate to "create" by clicking a button that says "new post"
    cy.contains("New post").click();
    cy.url().should("include", "/create");

    // Step 9: Fill in some title and content
    cy.get('input[name="title"]').type("Test Title");
    cy.get('textarea[name="content"]').type("Test Content");

    // Step 10: upload video
    cy.get("#videoFile").invoke("removeAttr", "style").click({ force: true });
    cy.get("#videoFile").selectFile(["cypress/e2e/sampleVideo.mp4"], {
      force: true,
    });
    cy.contains("Upload").click();
    cy.wait(3000)
    cy.contains("Create").click();

    // Step 11: Make sure the title and content are presented in the redirected page and included the video icon
    cy.url().should("include", "/drafts");
    cy.contains("🎥");
    cy.contains("Test Content");

    // Step 12: Logout and make sure redirected to home page as guest
    cy.contains("Log out").click();
    cy.url().should("include", "localhost:3000/1");
    cy.contains("Log in");
    cy.contains("Sign up");
    cy.contains("Log out").should("not.exist");
    cy.contains("Profile").should("not.exist");
  });
});
