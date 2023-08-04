
Note:
Before the attack, please revert to the commit 
```
38fe15a38669c49fca010a61ac98212a476f1a71
```
(the commit with the message "vulnerable site").
Any commit after that is the protected website.

If this is not working, you can clone the branches [Assignment4-protected](https://github.com/TzviGreenfeld/hw1-blog/tree/Assignment4-protected) and [Assignment4-vulnerable](https://github.com/TzviGreenfeld/hw1-blog/tree/Assignment4-vulnerable) and see the differences between them.

1. Sign up on our website.
2. Login using the user account you just created.
3. Save the token you received in the cookies from the response after logging in.
4. Open Git Bash.
5. In the following command, replace \*token\* with the actual token obtained in step 3, then run the command in Git Bash:
```
   curl --cookie 'cookie={"token":"*token*"}' -X POST -H "Content-Type: application/json"  http://localhost:3000/api/post -d '{"title":"Ive Been Hacked!","content":"This post has been sent from another browser!","email":"hacked.com","id":"","link":""}'
```

(there's also a bash script that accepts the token as command-line argument)

7. The "I've Been Hacked" post should appear on your drafts page.
