const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const loginRouter = require("express").Router();


import { PrismaClient, Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("got req.body:", req.body);
  const { username, password } = req.body;
  if (req.method === "POST") {
    const user = await prisma.user.findFirst({
      where: { userName: username },
    });

    // const user = await User.findOne();
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password);

      console.log("backend user:", user)
      console.log("backend passwordCorrect:", passwordCorrect)
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

    // const body = JSON.stringify({ token:token, username: user.userName, name: user.name });
    const body = { token:token, username: user.userName, name: user.name, email:user.email };
    res
      .status(200)
      .json(body);
  }
}
