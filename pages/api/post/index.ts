import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { csrf } from "../../../CSRF/csrf_setup";
const jwt = require("jsonwebtoken");


// POST /api/post
// Required fields in body: title
// Optional fields in body: content
const handler = async(
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { title, content, email, id, link } = req.body;

  const cookie = req.cookies.cookie;
  if (cookie) {
    const token = JSON.parse(cookie).token;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const user = decodedToken;
  
    //console.log( req.body);
    if (decodedToken.id) {

      // WAS SESSION
      const user = await prisma.user.findUnique({
        where: {
          id: decodedToken.id
        },
      });

      const result = await prisma.post.create({
        data: {
          title: title,
          content: content,
          author: { connect: { email: user.email } },
          videoId: id,
          videoLink: link,
        },
      });
      res.json(result);
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}

export default csrf(handler); 