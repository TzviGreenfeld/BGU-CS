import type { NextApiRequest, NextApiResponse } from "next";
const mongoose = require("mongoose");
import { connectMongo } from "../../../utils/connectMongo";
import VideoMetadata from "../../../models/metadataModel";

//POST /api/upload/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body);

  const { user, uploadDate, postId, cloudinaryLink } = body;

  console.log("parsed body for mongo: ");
  console.log(JSON.stringify(body));

  console.log("connecting to mongo..");
  await connectMongo();
  console.log("connected");

  const video = new VideoMetadata(body);
  video
    .save()
    .then((result: any) => {
      console.log("video saved!");
      res.json(result);
    })
    .catch((err: any) => {
      console.log("error saving video to mongodb: ", err);
      res.status(500).send({ message: "error saving video to mongodb" });
    });
}
