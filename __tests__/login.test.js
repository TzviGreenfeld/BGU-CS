import { createMocks } from 'node-mocks-http';
import loginHandler from '../pages/api/auth/login'
import signupHandler from '../pages/api/auth/signup'

const uniqueString = Date.now().toString();
const saltRounds = 10
const newUser = {
  userName: uniqueString,
  name: "name",
  email: uniqueString + "@gmail.com",
  password: "12345678",
}

const beforeLoginTest = async () => { 

    const { req, res } = createMocks({
            method: 'POST',
            body: newUser
        });
    
    await signupHandler(req, res);
    
};
        

describe("api/auth/login", () => {
    it("should login successfully", async () =>{
        
        await beforeLoginTest()
        const { req, res } = createMocks({
            method: 'POST',
            body: { username: newUser.userName, password: newUser.password },
        });
        
        await loginHandler(req, res);
        const responseBody = res._getData();
        
        
        expect(res.statusCode).toEqual(200);
        expect(responseBody).toHaveProperty('token')
    })

    it("should NOT login successfully (invalid password)", async () =>{
        
        await beforeLoginTest()
        const { req, res } = createMocks({
            method: 'POST',
            body: { username: newUser.userName, password: "randomPasswordInvalid" },
        });
        
        await loginHandler(req, res);
        const responseBody = res._getData();
        
        
        expect(res.statusCode).toEqual(401);
        expect(responseBody).not.toHaveProperty('token')
            
    })
    it("should NOT login successfully (invalid username)", async () =>{
        
        await beforeLoginTest()
        const { req, res } = createMocks({
            method: 'POST',
            body: { username: "randomUserNamedInvalid", password: newUser.password },
        });
        
        await loginHandler(req, res);
        const responseBody = res._getData();
        
        
        expect(res.statusCode).toEqual(401);
        expect(responseBody).not.toHaveProperty('token')
            
    })
})



  
