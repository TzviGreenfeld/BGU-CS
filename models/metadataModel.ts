import { Schema, model, models } from "mongoose";

const videoMetadataSchema = new Schema({
  user: String,
  uploadDate: String,
  postId: String, 
  cloudinaryLink: String,
});

const VideoMetadata =
  models.VideoMetadata || model("VideoMetadata", videoMetadataSchema);
export default VideoMetadata;
