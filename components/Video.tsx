import React, { useState, useEffect } from "react";

const Video = ({ videoLink }: { videoLink: String }) => {
  if (!videoLink) {
    return <></>;
  }
  return <video autoPlay controls src={videoLink.toString()}></video>;
};

export default Video;
