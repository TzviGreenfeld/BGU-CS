const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


import { PrismaClient, Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = req.body;
  if (req.method === "POST") {
    const user = await prisma.user.findFirst({
      where: { userName: username },
    });

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password);

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: "invalid username or password",
      });
    }

    const userForToken = {
      username: user.userName,
      id: user.id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 }
      );

    const body = { token:token, username: user.userName, name: user.name, email:user.email };
    res
    .setHeader("Set-Cookie",`cookie=${JSON.stringify({token:token})}; Max-Age=3600; Path=/;`)
                                         .status(200)
                                         .json(body);
  }
}
