import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
const jwt = require("jsonwebtoken");
import { csrf } from "../../../CSRF/csrf_setup";

// PUT /api/publish/:id
const handler =  async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const postId = req.query.id;
  // const session = await getSession({ req }) // WAS SESSION

  const cookie = req.cookies.cookie;
  
  if (cookie) {
    const token = JSON.parse(cookie).token;
 
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (decodedToken.id) {
      // WAS SESSION

      const post = await prisma.post.update({
        where: { id: Number(postId) },
        data: { published: true },
      });
      res.json(post);
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}
export default csrf(handler); 