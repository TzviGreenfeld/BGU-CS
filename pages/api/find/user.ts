import { PrismaClient, Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const username = req.headers.user;
    console.log("got username:",typeof username)
  if (req.method === "GET" ) {
    if (username){

        const user = await prisma.user.findFirst({
            where: { userName: username },
        });
        
        console.log("sending:", user)
        res
        .json(user)
        
    }
}
}
