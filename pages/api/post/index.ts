import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
const jwt = require('jsonwebtoken')

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, content, session, email, id, link } = req.body;
  // console.log("req.body:",req.body)
  const cookie = req.cookies.cookie;
  if (cookie){
    const token = JSON.parse(cookie).token
    const decodedToken = jwt.verify(token, process.env.SECRET)
  }

  if (decodedToken.id) { // WAS SESSION
    const result = await prisma.post.create({
      data: {
        title: title,
        content: content,
        author: { connect: { email: email } },
        videoId: id,
        videoLink: link,
      },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}
