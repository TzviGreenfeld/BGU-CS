import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
// import prisma from '../../lib/prisma'
import prisma from '../../lib/prisma'



//POST /api/editImage
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);

    const { username, newImage } = body;

    if (!newImage) {
      res.status(400).send({ message: 'no image provided' })
    }
    else if (!newImage.includes("cloudinary")) {
      res.status(400).send({ message: 'invalid image link' })
    }
    else {
      try {
        const updateUser = await prisma.user.update({
          where: {
            userName: username,
          },
          data: {
            image: newImage,
          },
        })
        res.json(updateUser);
      } catch (e) {
        res.status(400).send({ e })
      }
    }
  } else {
    res.status(401).send({ message: 'this endpint only allows POST requests' })
  }


}