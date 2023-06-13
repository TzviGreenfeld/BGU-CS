import type { NextApiRequest, NextApiResponse } from "next";
// import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { connectMongo } from "../../../utils/connectMongo";
import VideoMetadata from "../../../models/metadataModel";
import cloudinary from "cloudinary";

// DELETE /api/post/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postId = req.query.id;

  // const session = await getSession({ req }); // WAS SESSION

  if (req.method === "DELETE") {
    if (true) { // WAS SESSION
      console.log("got delete request for postId: ", postId);

      const post = await prisma.post.delete({
        where: { id: Number(postId) },
      });
      console.log(post);
      // delete video and metadata from cloudinary and mongodb
      if (post.videoId) {
        // mongo
        console.log("connecting to mongo..");
        await connectMongo();
        console.log("connected");

        VideoMetadata.deleteOne({ postId: post.videoId })
          .then((result: any) => {
            console.log("metadata deleted from mongo!");

            // delete video from cloudinary
            console.log("attempting to delete video from cloudinary..");
            cloudinary.v2.uploader
              .destroy(post.videoLink)
              .then((result: any) => {
                console.log("video deleted from cloudinary!");
              })
              .catch((error: any) => {
                console.log("error deleting from cloudinary:", error);
              });
          })
          .catch((error: any) => {
            console.log("error deleting from mongo:", error);
          });
      }
      res.json(post);
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
