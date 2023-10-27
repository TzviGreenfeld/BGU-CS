import { createMocks } from 'node-mocks-http';
import signupHandler from '../pages/api/auth/signup'
import imgHandler from '../pages/api/editImage'


const uniqueString = Date.now().toString();
const saltRounds = 10
const newUser = {
  userName: uniqueString,
  name: "name",
  email: uniqueString + "@gmail.com",
  password: "12345678",
}

const beforeTest = async () => { 

    const { req, res } = createMocks({
            method: 'POST',
            body: newUser
        });
    
    await signupHandler(req, res);
    
};
        

describe("api/editImagen", () => {
    it("should change existing user image successfully", async () =>{
        // make sure this user exists
        const newImageLink = "image.profile.png.cloudinary";
        await beforeTest()
        const { req, res } = createMocks({
            method: 'POST',
            body: JSON.stringify({ username: newUser.userName, newImage: newImageLink }),
        });
        
        await imgHandler(req, res);
        const responseBody = res._getData();
        
        
        expect(res.statusCode).toEqual(200);
    })

    it("should NOT change image successfully (invalid username)", async () =>{
        const newImageLink = "image.profile.png.cloudinary";
        
      await beforeTest()
      const { req, res } = createMocks({
          method: 'POST',
          body: JSON.stringify({ username: "invalid user name that doesnt exist", newImage: newImageLink }),
      });
      
      await imgHandler(req, res);
      const responseBody = res._getData();
      
      
      expect(res.statusCode).toEqual(400);
            
    })

    it('should return 400 status if username or image is missing', async () => {
        await beforeTest();
        const { req, res } = createMocks({
          method: 'POST',
          body: JSON.stringify({}),
        });
        
        await imgHandler(req, res);
        
        expect(res.statusCode).toEqual(400);
      });
      
      it('should return 400 status if the image link is invalid', async () => {
        const invalidImageLink = 'invalid-image-link';
        await beforeTest();
        const { req, res } = createMocks({
          method: 'POST',
          body: JSON.stringify({ username: newUser.userName, newImage: invalidImageLink }),
        });
        
        await imgHandler(req, res);
        
        expect(res.statusCode).toEqual(400);
      });
      
    
})



  
