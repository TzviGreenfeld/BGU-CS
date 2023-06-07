import { PrismaClient, Prisma, User } from "@prisma/client";
import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("got req.body:", req.body)
  const { userName, name, email, password } = req.body;
  if (req.method === "POST") {
    const newUser: Prisma.UserCreateInput = 
      {
        userName: userName,
        name: name,
        email: email,
        password: password,
      }
    
      try {
        const resultUser: User = await prisma.user.create({
          data: newUser,
        });
        res.json(resultUser);

      } catch (e) {
        res.status(500).json({ error: e.message });
      }

  }
}
