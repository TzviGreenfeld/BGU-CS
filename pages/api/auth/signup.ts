import { PrismaClient, Prisma, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const bcrypt = require("bcrypt");


const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("got req.body:", req.body)
  const { userName, name, email, password } = req.body;
  if (req.method === "POST") {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const newUser: Prisma.UserCreateInput = 
      {
        userName: userName,
        name: name,
        email: email,
        password: passwordHash,
      }
    
      try {
        const resultUser: User = await prisma.user.create({
          data: newUser,
        });
        res.json(resultUser);

      } catch (e:any) {
        res.status(500).json({ error: e.message });
      }

  }
}
