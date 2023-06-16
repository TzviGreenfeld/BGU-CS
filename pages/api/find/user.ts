import { PrismaClient, Prisma, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const username = req.headers.user;
  if (req.method === "GET" ) {
    if (username){

        const user =  await prisma.user.findFirst({
            where: {  userName: username },
            // include: {image: true},
        })
        if (user){
            // delete user.password;
            console.log("sending  user:" ,user)
            res.status(200).json(user)
        }
    }
    else {
        res.status(401).send("eror")
    }
}
}
