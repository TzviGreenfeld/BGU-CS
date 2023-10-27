import { createMocks } from 'node-mocks-http';
import signupHandler from '../pages/api/auth/signup'

describe('api/auth/signup', () => {
    it('should signup successfully', async () => {

      const uniqueString = Date.now().toString();
      const newUser = {
        userName: uniqueString,
        name: "name",
        email: uniqueString + "@gmail.com",
        password: "12345678"
        }


      const { req, res } = createMocks({
        method: 'POST',
        body: newUser
      });

      await signupHandler(req, res);
      
      const responseBody = JSON.parse(res._getData());
      delete newUser.password

      expect(res.statusCode).toEqual(200);
      expect(responseBody).toMatchObject(newUser)
      
    })

    it('should NOT signup successfully (two users with same username and email)', async () => {

      const uniqueString = Date.now().toString();
      const newUser = {
        userName: uniqueString,
        name: "name",
        email: uniqueString + "@gmail.com",
        password: "12345678"
      }

      const { req, res } = createMocks({
        method: 'POST',
        body: newUser
      });

      await signupHandler(req, res);
      await signupHandler(req, res);
      expect(res.statusCode).toEqual(500);
      
      
    })

    it('should NOT signup successfully (missing required fields)', async () => {
      const incompleteUser = {
        name: 'name',
        email: 'test@example.com',
        password: '12345678',
      };
    
      const { req, res } = createMocks({
        method: 'POST',
        body: incompleteUser,
      });
    
      await signupHandler(req, res);
      expect(res.statusCode).toEqual(500);

    });
    

  })

